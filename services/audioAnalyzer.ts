
// Audio analysis service for shot detection via microphone

import { Audio } from 'expo-av';

export class AudioAnalyzer {
  private recording: Audio.Recording | null = null;
  private isAnalyzing = false;
  private analysisInterval: NodeJS.Timeout | null = null;

  constructor() {
    console.log('AudioAnalyzer initialized');
  }

  async startAnalyzing(onLevelChange: (level: number) => void) {
    try {
      console.log('Starting audio analysis...');
      
      // Request permissions
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        console.error('Audio permission not granted');
        return;
      }

      // Configure audio mode
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      // Create recording
      this.recording = new Audio.Recording();
      
      try {
        await this.recording.prepareToRecordAsync({
          ...Audio.RecordingOptionsPresets.HIGH_QUALITY,
          android: {
            extension: '.m4a',
            outputFormat: Audio.AndroidOutputFormat.MPEG_4,
            audioEncoder: Audio.AndroidAudioEncoder.AAC,
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
          },
          ios: {
            extension: '.m4a',
            outputFormat: Audio.IOSOutputFormat.MPEG4AAC,
            audioQuality: Audio.IOSAudioQuality.HIGH,
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
            linearPCMBitDepth: 16,
            linearPCMIsBigEndian: false,
            linearPCMIsFloat: false,
          },
          web: {
            mimeType: 'audio/webm',
            bitsPerSecond: 128000,
          },
        });

        await this.recording.startAsync();
        this.isAnalyzing = true;

        // Poll audio levels
        this.analysisInterval = setInterval(async () => {
          if (this.recording && this.isAnalyzing) {
            try {
              const status = await this.recording.getStatusAsync();
              if (status.isRecording && status.metering !== undefined) {
                // Normalize metering value (typically -160 to 0 dB)
                // Convert to 0-1 range
                const normalizedLevel = Math.max(0, Math.min(1, (status.metering + 160) / 160));
                onLevelChange(normalizedLevel);
              }
            } catch (error) {
              console.error('Error getting recording status:', error);
            }
          }
        }, 50); // Check every 50ms

        console.log('Audio analysis started successfully');
      } catch (error) {
        console.error('Error preparing/starting recording:', error);
        this.isAnalyzing = false;
      }
    } catch (error) {
      console.error('Error starting audio analysis:', error);
      this.isAnalyzing = false;
    }
  }

  async stopAnalyzing() {
    try {
      console.log('Stopping audio analysis...');
      this.isAnalyzing = false;

      if (this.analysisInterval) {
        clearInterval(this.analysisInterval);
        this.analysisInterval = null;
      }

      if (this.recording) {
        try {
          const status = await this.recording.getStatusAsync();
          if (status.isRecording) {
            await this.recording.stopAndUnloadAsync();
          }
        } catch (error) {
          console.error('Error stopping recording:', error);
        }
        this.recording = null;
      }

      console.log('Audio analysis stopped');
    } catch (error) {
      console.error('Error in stopAnalyzing:', error);
    }
  }

  isActive(): boolean {
    return this.isAnalyzing;
  }
}
