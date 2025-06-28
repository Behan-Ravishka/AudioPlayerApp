import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

export default function TrackInfo({ title, artist }: { title: string; artist: string }) {
  return (
    <BlurView intensity={50} style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.artist}>{artist}</Text>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  artist: {
    fontSize: 18,
    color: '#ccc',
  },
});
