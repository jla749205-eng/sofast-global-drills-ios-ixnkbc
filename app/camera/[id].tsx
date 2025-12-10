
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { CameraView, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import { Gyroscope } from 'expo-sensors';
import { colors } from '@/styles/commonStyles';
import { getDrillById } from '@/data/drills';
import { IconSymbol } from '@/components/IconSymbol';
import { ShotDetector, FlinchDetector } from '@/services/shotDetection';
import { AudioAnalyzer } from '@/services/audioAnalyzer';
import { ParTimer } from '@/services/parTimer';

export default function CameraScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const drill = getDrillById(id);
  
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [micPermission, requestMicPermission] = useMicrophonePermissions();
  
  const [isRecording, setIsRecording] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [shotCount, setShotCount] = useState(0);
  const [splits, setSplits] = useState<number[]>([]);
  const [flinchCount, setFlinchCount] = useState(0);
  const [parReached, setParReached] = useState(false);
  
  const cameraRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const lastShotTimeRef = useRef<number>(0);
  const gyroSubscriptionRef = useRef<any>(null);
  
  const shotDetectorRef = useRef(new ShotDetector());
  const flinchDetectorRef = useRef(new FlinchDetector());
  const audioAnalyzerRef = useRef(new AudioAnalyzer());
  const parTimerRef = useRef(new ParTimer());

  useEffect(() => {
    // Copy ref values to variables for cleanup
    const audioAnalyzer = audioAnalyzerRef.current;
    const parTimer = parTimerRef.current;
    
    parTimer.initialize();
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (gyroSubscriptionRef.current) {
        gyroSubscriptionRef.current.remove();
      }
      audioAnalyzer.stopAnalyzing();
      parTimer.cleanup();
    };
  }, []);

  const setupSensors = async () => {
    console.log('Setting up sensors for shot detection');
    
    // Setup gyroscope
    Gyroscope.setUpdateInterval(16); // ~60fps
    
    gyroSubscriptionRef.current = Gyroscope.addListener(gyroscopeData => {
      // Add to flinch detector
      flinchDetectorRef.current.addGyroSample(
        gyroscopeData.x,
        gyroscopeData.y,
        gyroscopeData.z
      );

      // Check for shot via gyro
      const gyroResult = shotDetectorRef.current.processGyroData(
        gyroscopeData.x,
        gyroscopeData.y,
        gyroscopeData.z
      );

      if (gyroResult) {
        handleShotDetected(gyroResult.timestamp);
      }
    });

    // Setup audio analyzer
    await audioAnalyzerRef.current.startAnalyzing((level) => {
      const audioResult = shotDetectorRef.current.processAudioLevel(level);
      if (audioResult) {
        handleShotDetected(audioResult.timestamp);
      }
    });

    shotDetectorRef.current.startMonitoring();
  };

  const handleShotDetected = (timestamp: number) => {
    const now = timestamp;
    const timeSinceStart = (now - startTimeRef.current) / 1000;
    
    // Calculate split time
    if (lastShotTimeRef.current > 0) {
      const split = (now - lastShotTimeRef.current) / 1000;
      setSplits(prev => [...prev, split]);
    }
    
    // Check for flinch
    const hasFlinch = flinchDetectorRef.current.detectFlinch(timestamp);
    if (hasFlinch) {
      setFlinchCount(prev => prev + 1);
    }
    
    lastShotTimeRef.current = now;
    setShotCount(prev => prev + 1);
    
    console.log(`Shot ${shotCount + 1} detected at ${timeSinceStart.toFixed(2)}s${hasFlinch ? ' (FLINCH)' : ''}`);
  };

  const startDrill = async () => {
    if (!cameraPermission?.granted || !micPermission?.granted) {
      Alert.alert(
        'Permissions Required',
        'Camera and microphone permissions are needed to record drills.',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Grant Permissions', 
            onPress: async () => {
              await requestCameraPermission();
              await requestMicPermission();
            }
          }
        ]
      );
      return;
    }

    // Start countdown
    setCountdown(3);
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(countdownInterval);
          beginRecording();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const beginRecording = async () => {
    try {
      console.log('Starting recording...');
      setIsRecording(true);
      setParReached(false);
      startTimeRef.current = Date.now();
      lastShotTimeRef.current = 0;
      setShotCount(0);
      setSplits([]);
      setFlinchCount(0);
      
      // Play start beep
      await parTimerRef.current.playStartBeep();
      
      // Start camera recording
      if (cameraRef.current) {
        cameraRef.current.recordAsync();
      }
      
      // Start sensors
      await setupSensors();
      
      // Start par timer if drill has par time
      if (drill?.parTime) {
        parTimerRef.current.startParTimer(drill.parTime, () => {
          setParReached(true);
          console.log('Par time reached!');
        });
      }
      
      // Start elapsed time timer
      timerRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        setElapsedTime(elapsed);
      }, 100);
      
    } catch (error) {
      console.error('Error starting recording:', error);
      Alert.alert('Error', 'Failed to start recording');
    }
  };

  const stopDrill = async () => {
    try {
      console.log('Stopping recording...');
      setIsRecording(false);
      
      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      // Stop par timer
      parTimerRef.current.stopParTimer();
      
      // Stop sensors
      if (gyroSubscriptionRef.current) {
        gyroSubscriptionRef.current.remove();
        gyroSubscriptionRef.current = null;
      }
      
      shotDetectorRef.current.stopMonitoring();
      await audioAnalyzerRef.current.stopAnalyzing();
      
      // Stop camera recording
      if (cameraRef.current) {
        await cameraRef.current.stopRecording();
      }
      
      // Navigate to target photo screen for accuracy verification
      router.push({
        pathname: '/target-photo/[id]',
        params: {
          id: drill?.id || '',
          time: elapsedTime.toFixed(2),
          shots: shotCount.toString(),
          splits: JSON.stringify(splits),
          flinches: flinchCount.toString(),
        }
      });
      
    } catch (error) {
      console.error('Error stopping recording:', error);
      Alert.alert('Error', 'Failed to stop recording');
    }
  };

  if (!cameraPermission || !micPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading permissions...</Text>
      </View>
    );
  }

  if (!cameraPermission.granted || !micPermission.granted) {
    return (
      <View style={styles.container}>
        <View style={styles.permissionContainer}>
          <IconSymbol
            ios_icon_name="camera.fill"
            android_material_icon_name="camera"
            size={64}
            color={colors.primary}
          />
          <Text style={styles.permissionTitle}>Permissions Required</Text>
          <Text style={styles.permissionText}>
            SOFAST Global needs camera and microphone access to record and analyze your drills with AI-powered shot detection.
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={async () => {
              await requestCameraPermission();
              await requestMicPermission();
            }}
          >
            <Text style={styles.permissionButtonText}>Grant Permissions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backButtonAlt}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="back"
        mode="video"
        mute={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => router.back()}
            disabled={isRecording}
          >
            <IconSymbol
              ios_icon_name="xmark"
              android_material_icon_name="close"
              size={28}
              color={isRecording ? colors.textSecondary : colors.text}
            />
          </TouchableOpacity>
          <Text style={styles.drillTitle}>{drill?.name}</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Countdown Overlay */}
        {countdown !== null && (
          <View style={styles.countdownOverlay}>
            <Text style={styles.countdownText}>{countdown}</Text>
            <Text style={styles.countdownSubtext}>GET READY</Text>
          </View>
        )}

        {/* Recording Stats */}
        {isRecording && (
          <View style={styles.statsOverlay}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>TIME</Text>
              <Text style={[
                styles.statValue,
                parReached && styles.overPar
              ]}>
                {elapsedTime.toFixed(2)}s
              </Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>SHOTS</Text>
              <Text style={styles.statValue}>{shotCount}/{drill?.rounds}</Text>
            </View>
            {drill?.parTime && (
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>PAR</Text>
                <Text style={[
                  styles.statValue,
                  parReached && styles.overPar
                ]}>
                  {drill.parTime}s
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Flinch Warning */}
        {isRecording && flinchCount > 0 && (
          <View style={styles.flinchWarning}>
            <IconSymbol
              ios_icon_name="exclamationmark.triangle.fill"
              android_material_icon_name="warning"
              size={16}
              color={colors.accent}
            />
            <Text style={styles.flinchText}>{flinchCount} Flinch{flinchCount > 1 ? 'es' : ''} Detected</Text>
          </View>
        )}

        {/* Recording Indicator */}
        {isRecording && (
          <View style={styles.recordingIndicator}>
            <View style={styles.recordingDot} />
            <Text style={styles.recordingText}>RECORDING</Text>
          </View>
        )}

        {/* Control Buttons */}
        <View style={styles.controls}>
          {!isRecording ? (
            <TouchableOpacity
              style={styles.startButton}
              onPress={startDrill}
              activeOpacity={0.8}
            >
              <IconSymbol
                ios_icon_name="play.circle.fill"
                android_material_icon_name="play_circle"
                size={80}
                color={colors.primary}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.stopButton}
              onPress={stopDrill}
              activeOpacity={0.8}
            >
              <View style={styles.stopSquare} />
            </TouchableOpacity>
          )}
        </View>

        {/* Instructions */}
        {!isRecording && countdown === null && (
          <View style={styles.instructionsOverlay}>
            <IconSymbol
              ios_icon_name="info.circle.fill"
              android_material_icon_name="info"
              size={24}
              color={colors.primary}
            />
            <Text style={styles.instructionText}>
              Prop your phone on a stable surface with a clear view of the target area. AI will detect shots via audio and recoil.
            </Text>
          </View>
        )}
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  camera: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 48 : 60,
    paddingBottom: 16,
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drillTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  countdownOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  countdownText: {
    fontSize: 120,
    fontWeight: '900',
    color: colors.primary,
  },
  countdownSubtext: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
    letterSpacing: 4,
  },
  statsOverlay: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 120 : 140,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 8,
  },
  statBox: {
    flex: 1,
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.primary,
    marginTop: 4,
  },
  overPar: {
    color: colors.accent,
  },
  flinchWarning: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 220 : 240,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(250, 204, 21, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  flinchText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.background,
  },
  recordingIndicator: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 260 : 280,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(220, 38, 38, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 8,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.text,
  },
  recordingText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: 1,
  },
  controls: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
  startButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: colors.primary,
  },
  stopSquare: {
    width: 32,
    height: 32,
    backgroundColor: colors.accent,
    borderRadius: 4,
  },
  instructionsOverlay: {
    position: 'absolute',
    bottom: 140,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(30, 41, 59, 0.95)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  instructionText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  text: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
  },
  permissionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginTop: 24,
    marginBottom: 12,
  },
  permissionText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  permissionButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  permissionButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.background,
  },
  backButtonAlt: {
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
});
