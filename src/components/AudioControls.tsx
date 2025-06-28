import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';

interface Props {
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  position: number;
  duration: number;
  onSeek: (millis: number) => void;
}

function formatTime(ms: number) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export default function AudioControls({
  onPlay,
  onPause,
  onStop,
  position,
  duration,
  onSeek,
}: Props) {
  return (
    <View style={styles.wrapper}>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onSlidingComplete={onSeek}
        minimumTrackTintColor="#4cd137"
        maximumTrackTintColor="#555"
        thumbTintColor="#4cd137"
      />
      <View style={styles.time}>
        <Text style={styles.timeText}>{formatTime(position)}</Text>
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>
      <View style={styles.controls}>
        <NeumorphicButton label="Play" onPress={onPlay} />
        <NeumorphicButton label="Pause" onPress={onPause} />
        <NeumorphicButton label="Stop" onPress={onStop} />
      </View>
    </View>
  );
}

function NeumorphicButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.neumorphicButton} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
  },
  slider: {
    width: '90%',
    height: 40,
  },
  time: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  timeText: {
    color: '#aaa',
  },
  controls: {
    flexDirection: 'row',
    gap: 10,
  },
  neumorphicButton: {
    backgroundColor: '#1e1e1e',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginHorizontal: 8,
    shadowOffset: { width: -3, height: -3 },
    shadowColor: '#2e2e2e',
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
