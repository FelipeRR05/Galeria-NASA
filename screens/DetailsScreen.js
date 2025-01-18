import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native';

const DetailsScreen = ({ route }) => {
  const { image } = route.params;
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return (
    <View style={[styles.container, isLandscape && styles.landscapeContainer]}>
      <Image
        source={{ uri: image.imageUrl }}
        style={[styles.image, isLandscape && styles.landscapeImage]}
      />
      <View style={[styles.textContainer, isLandscape && styles.landscapeTextContainer]}>
        <Text style={styles.title}>{image.title}</Text>
        <Text style={styles.author}>Autor: {image.description ? "Desconhecido" : image.description}</Text>
        <Text style={styles.description}>{image.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  landscapeContainer: { flexDirection: 'row', alignItems: 'flex-start' },
  image: { width: '100%', height: 200, marginBottom: 10 },
  landscapeImage: { width: '40%', height: '100%' },
  textContainer: { flex: 1 },
  landscapeTextContainer: { marginLeft: 10 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  author: { fontSize: 14, fontWeight: '500', color: '#555', marginBottom: 5 },
  description: { fontSize: 14, color: '#555', marginTop: 10 },
});

export default DetailsScreen;
