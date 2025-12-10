
import { Audio, RecordingObject } from 'expo-av';

export class AudioAnalyzer {
  private recording: RecordingObject | null = null;
  private isAnalyzing = false;
  private onLevelUpdate?: (level: number) => void;
  private meteringInterval: NodeJS.Timeout | null = null;

  async startAnalyzing(onLevelUpdate: (level: number) => void) {
    try {
      console.log('Starting audio analysis...');
      this.onLevelUpdate = onLevelUpdate;
      this.isAnalyzing = true;

      // Request permissions
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        console.error('Audio permission not granted');
        return;
      }

      // Configure audio mode
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
      });

      // Start recording with metering enabled
      const { recording } = await Audio.Recording.createAsync(
        {
          ...Audio.RecordingOptionsPresets.HIGH_QUALITY,
          isMeteringEnabled: true,
        }
      );

      this.recording = recording;

      // Poll metering data
      this.meteringInterval = setInterval(async () => {
        if (this.recording && this.isAnalyzing) {
          const status = await this.recording.getStatusAsync();
          if (status.isRecording && status.metering !== undefined) {
            // Normalize metering value (typically -160 to 0 dB)
            const normalizedLevel = Math.max(0, (status.metering + 160) / 160);
            this.onLevelUpdate?.(normalizedLevel);
          }
        }
      }, 50); // Check every 50ms

      console.log('Audio analysis started');
    } catch (error) {
      console.error('Error starting audio analysis:', error);
    }
  }

  async stopAnalyzing() {
    try {
      console.log('Stopping audio analysis...');
      this.isAnalyzing = false;

      if (this.meteringInterval) {
        clearInterval(this.meteringInterval);
        this.meteringInterval = null;
      }

      if (this.recording) {
        await this.recording.stopAndUnloadAsync();
        this.recording = null;
      }

      console.log('Audio analysis stopped');
    } catch (error) {
      console.error('Error stopping audio analysis:', error);
    }
  }

  isActive() {
    return this.isAnalyzing;
  }
}
