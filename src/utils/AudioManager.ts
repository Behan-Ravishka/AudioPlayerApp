import { Audio, AVPlaybackStatus, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';

export async function configureAudioMode() {
  await Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    staysActiveInBackground: true,
    interruptionModeIOS: InterruptionModeIOS.DoNotMix,
    playsInSilentModeIOS: true,
    interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
    shouldDuckAndroid: true,
    playThroughEarpieceAndroid: false,
  });
}

class AudioManager {
  private sound: Audio.Sound | null = null;
  private isPlaying: boolean = false;

  async load(uri: string, onPlaybackStatusUpdate: (status: AVPlaybackStatus) => void) {
    if (this.sound) {
      await this.sound.unloadAsync();
      this.sound = null;
    }
    const { sound } = await Audio.Sound.createAsync(
      { uri },
      { shouldPlay: false },
      onPlaybackStatusUpdate
    );
    this.sound = sound;
  }

  async play() {
    if (this.sound && !this.isPlaying) {
      await this.sound.playAsync();
      this.isPlaying = true;
    }
  }

  async pause() {
    if (this.sound && this.isPlaying) {
      await this.sound.pauseAsync();
      this.isPlaying = false;
    }
  }

  async stop() {
    if (this.sound) {
      await this.sound.stopAsync();
      this.isPlaying = false;
    }
  }

  async unload() {
    if (this.sound) {
      await this.sound.unloadAsync();
      this.sound = null;
      this.isPlaying = false;
    }
  }

  async seekTo(millis: number) {
    if (this.sound) {
      await this.sound.setPositionAsync(millis);
    }
  }
}

export default new AudioManager();
