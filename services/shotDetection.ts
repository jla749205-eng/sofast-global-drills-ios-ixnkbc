
import { Audio } from 'expo-av';

export interface ShotDetectionResult {
  timestamp: number;
  confidence: number;
  method: 'audio' | 'gyro' | 'combined';
}

export class ShotDetector {
  private audioThreshold = 0.7; // Normalized audio level threshold
  private gyroThreshold = 2.5; // Gyroscope magnitude threshold
  private minTimeBetweenShots = 100; // Minimum ms between shots
  private lastShotTime = 0;
  private audioLevels: number[] = [];
  private isMonitoring = false;

  constructor() {
    console.log('ShotDetector initialized');
  }

  // Process audio data for muzzle blast detection
  processAudioLevel(level: number): ShotDetectionResult | null {
    if (!this.isMonitoring) return null;

    this.audioLevels.push(level);
    
    // Keep only last 10 samples for baseline
    if (this.audioLevels.length > 10) {
      this.audioLevels.shift();
    }

    // Calculate baseline average
    const baseline = this.audioLevels.reduce((a, b) => a + b, 0) / this.audioLevels.length;
    
    // Detect spike above baseline
    if (level > baseline * 2 && level > this.audioThreshold) {
      const now = Date.now();
      
      // Debounce - ignore if too soon after last shot
      if (now - this.lastShotTime < this.minTimeBetweenShots) {
        return null;
      }

      this.lastShotTime = now;
      console.log(`Audio shot detected: level=${level.toFixed(2)}, baseline=${baseline.toFixed(2)}`);
      
      return {
        timestamp: now,
        confidence: Math.min(level / this.audioThreshold, 1),
        method: 'audio'
      };
    }

    return null;
  }

  // Process gyroscope data for recoil detection
  processGyroData(x: number, y: number, z: number): ShotDetectionResult | null {
    if (!this.isMonitoring) return null;

    // Calculate magnitude of rotation
    const magnitude = Math.sqrt(x * x + y * y + z * z);

    if (magnitude > this.gyroThreshold) {
      const now = Date.now();
      
      // Debounce
      if (now - this.lastShotTime < this.minTimeBetweenShots) {
        return null;
      }

      this.lastShotTime = now;
      console.log(`Gyro shot detected: magnitude=${magnitude.toFixed(2)}`);
      
      return {
        timestamp: now,
        confidence: Math.min(magnitude / (this.gyroThreshold * 2), 1),
        method: 'gyro'
      };
    }

    return null;
  }

  // Combine multiple detection methods for higher accuracy
  combineDetections(audioResult: ShotDetectionResult | null, gyroResult: ShotDetectionResult | null): ShotDetectionResult | null {
    if (audioResult && gyroResult) {
      // Both detected - high confidence
      return {
        timestamp: audioResult.timestamp,
        confidence: (audioResult.confidence + gyroResult.confidence) / 2,
        method: 'combined'
      };
    }

    // Return whichever detected
    return audioResult || gyroResult;
  }

  startMonitoring() {
    this.isMonitoring = true;
    this.lastShotTime = 0;
    this.audioLevels = [];
    console.log('Shot detection monitoring started');
  }

  stopMonitoring() {
    this.isMonitoring = false;
    console.log('Shot detection monitoring stopped');
  }

  reset() {
    this.lastShotTime = 0;
    this.audioLevels = [];
  }
}

// Flinch detection based on gyroscope patterns
export class FlinchDetector {
  private gyroHistory: { x: number; y: number; z: number; timestamp: number }[] = [];
  private maxHistorySize = 30; // Keep last 30 samples (~500ms at 60fps)

  addGyroSample(x: number, y: number, z: number) {
    this.gyroHistory.push({ x, y, z, timestamp: Date.now() });
    
    if (this.gyroHistory.length > this.maxHistorySize) {
      this.gyroHistory.shift();
    }
  }

  // Detect anticipatory movement before shot
  detectFlinch(shotTimestamp: number): boolean {
    // Look at gyro data 200ms before shot
    const preShotWindow = this.gyroHistory.filter(
      sample => sample.timestamp > shotTimestamp - 200 && sample.timestamp < shotTimestamp
    );

    if (preShotWindow.length < 5) return false;

    // Calculate average movement in pre-shot window
    const avgMovement = preShotWindow.reduce((sum, sample) => {
      const magnitude = Math.sqrt(sample.x ** 2 + sample.y ** 2 + sample.z ** 2);
      return sum + magnitude;
    }, 0) / preShotWindow.length;

    // Flinch detected if significant movement before shot
    const flinchThreshold = 1.5;
    const hasFlinch = avgMovement > flinchThreshold;
    
    if (hasFlinch) {
      console.log(`Flinch detected: avg movement=${avgMovement.toFixed(2)}`);
    }

    return hasFlinch;
  }

  reset() {
    this.gyroHistory = [];
  }
}
