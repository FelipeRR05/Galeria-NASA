import { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { fetchImages } from '../api/nasaApi';
import CustomPicker from '../components/CustomPicker';
import ProgressBar from '../components/ProgressBar';

const GalleryScreen = ({ navigation }) => {
  const [astro, setAstro] = useState('earth'); 
  const [images, setImages] = useState([]); 
  const [page, setPage] = useState(1); 
  const [loading, setLoading] = useState(false); 
  const [refreshing, setRefreshing] = useState(false); 
  const [totalItems, setTotalItems] = useState(100); 

  const astroOptions = [
    { label: 'Earth', value: 'earth' },
    { label: 'Moon', value: 'moon' },
    { label: 'Mars', value: 'mars' },
    { label: 'Sun', value: 'sun' },
    { label: 'Jupiter', value: 'jupiter' },
  ];

  const loadImages = async (reset = false) => {
    if (loading) return;
    setLoading(true);

    try {
      const newImages = await fetchImages(astro, reset ? 1 : page);
      setImages(reset ? newImages : [...images, ...newImages]); 
      setPage(reset ? 2 : page + 1); 
    } catch (error) {
      console.error('Erro ao carregar imagens:', error);
    }

    setLoading(false);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadImages(true); 
    setRefreshing(false);
  };

  useEffect(() => {
    loadImages(true);
  }, [astro]);

  const renderImage = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Details', { image: item })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  const progressPercentage = images.length >= totalItems ? 100 : (images.length / totalItems) * 100;

  return (
    <View style={styles.container}>
      <CustomPicker
        selectedValue={astro}
        onValueChange={(value) => setAstro(value)}
        options={astroOptions}
      />

      <FlatList
        data={images}
        keyExtractor={(item) => item.id} 
        renderItem={renderImage}
        onEndReached={() => loadImages()} 
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading && <ActivityIndicator size="large" />} 
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />

      <ProgressBar progress={progressPercentage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  image: { height: 150, width: '100%', marginBottom: 10 },
  title: { fontSize: 16, fontWeight: 'bold', marginVertical: 5 },
});

export default GalleryScreen;
