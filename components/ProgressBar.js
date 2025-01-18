import { View, Text, StyleSheet } from 'react-native';

const ProgressBar = ({ progress }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.bar, { width: `${progress}%` }]} />
      <Text style={styles.text}>{Math.round(progress)}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 20,
    backgroundColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
  },
  bar: {
    height: '100%',
    backgroundColor: '#4caf50',
  },
  text: {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: [{ translateX: -20 }],
    color: '#000',
    fontWeight: 'bold',
  },
});

export default ProgressBar;
