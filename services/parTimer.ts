
import { Audio } from 'expo-av';

export class ParTimer {
  private beepSound: Audio.Sound | null = null;
  private parTimeout: NodeJS.Timeout | null = null;

  async initialize() {
    try {
      // Create beep sound programmatically or load from asset
      // For now, we'll use system sounds
      console.log('ParTimer initialized');
    } catch (error) {
      console.error('Error initializing ParTimer:', error);
    }
  }

  async playStartBeep() {
    try {
      // Play start beep
      const { sound } = await Audio.Sound.createAsync(
        { uri: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGS57OihUBELTKXh8LJnHgU2jdXvzHksBSh+zPDckUELFGCz6OyrWBQLSKDf8sFuJAUrgc7y2Ik2CBhku+zooVARC0yl4fCyZx4FNo3V78x5LAUofszw3JFBC' },
        { shouldPlay: true }
      );
      
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error('Error playing start beep:', error);
    }
  }

  async playParBeep() {
    try {
      // Play par time warning beep
      const { sound } = await Audio.Sound.createAsync(
        { uri: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGS57OihUBELTKXh8LJnHgU2jdXvzHksBSh+zPDckUELFGCz6OyrWBQLSKDf8sFuJAUrgc7y2Ik2CBhku+zooVARC0yl4fCyZx4FNo3V78x5LAUofszw3JFBC' },
        { shouldPlay: true }
      );
      
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error('Error playing par beep:', error);
    }
  }

  startParTimer(parTime: number, onParReached: () => void) {
    if (this.parTimeout) {
      clearTimeout(this.parTimeout);
    }

    this.parTimeout = setTimeout(() => {
      this.playParBeep();
      onParReached();
    }, parTime * 1000);
  }

  stopParTimer() {
    if (this.parTimeout) {
      clearTimeout(this.parTimeout);
      this.parTimeout = null;
    }
  }

  cleanup() {
    this.stopParTimer();
    if (this.beepSound) {
      this.beepSound.unloadAsync();
      this.beepSound = null;
    }
  }
}
