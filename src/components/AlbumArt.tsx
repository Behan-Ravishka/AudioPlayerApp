import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Easing, View, ImageStyle, ImageSourcePropType } from 'react-native';

type AlbumArtProps = {
  uri: ImageSourcePropType;
  size?: number;
  isPlaying: boolean;
};

const AlbumArt: React.FC<AlbumArtProps> = ({ uri, size = 250, isPlaying }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let animation: Animated.CompositeAnimation;

    if (isPlaying) {
      animation = Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 15000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      animation.start();
    } else {
      rotateAnim.stopAnimation();
    }

    return () => {
      animation?.stop();
    };
  }, [isPlaying]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const imageStyle: Animated.WithAnimatedObject<ImageStyle> = {
    width: size,
    height: size,
    borderRadius: size / 2,
    transform: [{ rotate: rotation }],
  };

  return (
    <View style={[styles.wrapper, { width: size, height: size, borderRadius: size / 2 }]}>
      <Animated.Image source={uri} style={imageStyle} />
    </View>
  );
};

export default AlbumArt;

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 5,
    borderColor: '#4cd137',
    shadowColor: '#4cd137',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    alignSelf: 'center',
    overflow: 'hidden',
  },
});
