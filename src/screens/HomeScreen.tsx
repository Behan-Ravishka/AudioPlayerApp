import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import AudioControls from '../components/AudioControls';
import TrackInfo from '../components/TrackInfo';
import AlbumArt from '../components/AlbumArt';
import AudioManager from '../utils/AudioManager';
import albumArt from '../../assets/images/album-art.jpg';

const SAMPLE_AUDIO = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

export default function HomeScreen() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const onPlaybackStatusUpdate = (status: any) => {
      if (status.isLoaded && status.durationMillis != null) {
        setPosition(status.positionMillis);
        setDuration(status.durationMillis);
        setIsPlaying(status.isPlaying);
      }
    };

    async function prepareAudio() {
      try {
        await AudioManager.load(SAMPLE_AUDIO, onPlaybackStatusUpdate);
        setIsLoaded(true);
      } catch (error) {
        Alert.alert('Error loading audio', String(error));
      }
    }

    prepareAudio();

    return () => {
      AudioManager.unload();
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* Use require() for local images */}
      <AlbumArt uri={require('../../assets/images/album-art.jpg')} isPlaying={isPlaying} size={250} />
      <TrackInfo title="SoundHelix Song 1" artist="SoundHelix" />
      <AudioControls
        onPlay={() => isLoaded && AudioManager.play()}
        onPause={() => AudioManager.pause()}
        onStop={() => AudioManager.stop()}
        position={position}
        duration={duration}
        onSeek={(millis) => AudioManager.seekTo(millis)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
});
