
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert, Image, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '@/styles/commonStyles';
import { getDrillById } from '@/data/drills';
import { IconSymbol } from '@/components/IconSymbol';
import { TargetAnalyzer } from '@/services/targetAnalyzer';

export default function TargetPhotoScreen() {
  const router = useRouter();
  const { id, time, shots, splits, flinches } = useLocalSearchParams<{
    id: string;
    time: string;
    shots: string;
    splits: string;
    flinches?: string;
  }>();
  
  const drill = getDrillById(id);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [targetType, setTargetType] = useState<'USPSA' | 'IDPA'>('USPSA');
  const cameraRef = useRef<any>(null);

  const handleTakePhoto = async () => {
    try {
      if (!cameraRef.current) {
        console.error('Camera ref not available');
        return;
      }

      console.log('Taking photo...');
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
      });

      console.log('Photo captured:', photo.uri);
      setCapturedImage(photo.uri);
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to capture photo');
    }
  };

  const handlePickFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        console.log('Image selected from gallery:', result.assets[0].uri);
        setCapturedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to select image');
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const handleAnalyze = async () => {
    if (!capturedImage) {
      Alert.alert('Error', 'Please capture a target photo first');
      return;
    }

    try {
      setIsAnalyzing(true);
      
      const targetAnalyzer = TargetAnalyzer.getInstance();
      const expectedHits = parseInt(shots || '0', 10);
      
      const analysis = await targetAnalyzer.analyzeTarget(
        capturedImage,
        targetType,
        expectedHits
      );

      console.log('Analysis complete:', analysis);
      
      // Navigate to results with analysis data
      router.push({
        pathname: '/results/[id]',
        params: {
          id: drill?.id || '',
          time,
          shots,
          splits,
          flinches,
          targetAnalysis: JSON.stringify(analysis),
        }
      });
    } catch (error) {
      console.error('Error analyzing target:', error);
      Alert.alert('Error', 'Failed to analyze target. Continuing without accuracy data.');
      
      // Continue to results without analysis
      router.push({
        pathname: '/results/[id]',
        params: {
          id: drill?.id || '',
          time,
          shots,
          splits,
          flinches,
        }
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSkip = () => {
    Alert.alert(
      'Skip Target Analysis?',
      'Without a target photo, we cannot verify accuracy. Your score will be based on timing only.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Skip',
          style: 'destructive',
          onPress: () => {
            router.push({
              pathname: '/results/[id]',
              params: {
                id: drill?.id || '',
                time,
                shots,
                splits,
                flinches,
              }
            });
          }
        }
      ]
    );
  };

  if (!cameraPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading camera...</Text>
      </View>
    );
  }

  if (!cameraPermission.granted) {
    return (
      <View style={styles.container}>
        <View style={styles.permissionContainer}>
          <IconSymbol
            ios_icon_name="camera.fill"
            android_material_icon_name="camera"
            size={64}
            color={colors.primary}
          />
          <Text style={styles.permissionTitle}>Camera Permission Required</Text>
          <Text style={styles.permissionText}>
            To verify your target accuracy, we need access to your camera to photograph your target.
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestCameraPermission}
          >
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={handleSkip}
          >
            <Text style={styles.skipButtonText}>Skip Accuracy Check</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <IconSymbol
            ios_icon_name="chevron.left"
            android_material_icon_name="arrow_back"
            size={24}
            color={colors.text}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Target Verification</Text>
        <TouchableOpacity
          style={styles.skipHeaderButton}
          onPress={handleSkip}
        >
          <Text style={styles.skipHeaderText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Instructions */}
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsTitle}>Photograph Your Target</Text>
        <Text style={styles.instructionsText}>
          Take a clear photo of your target for AI-powered accuracy verification. Ensure the entire target is visible and well-lit.
        </Text>
        
        {/* Target Type Selector */}
        <View style={styles.targetTypeContainer}>
          <Text style={styles.targetTypeLabel}>Target Type:</Text>
          <View style={styles.targetTypeButtons}>
            <TouchableOpacity
              style={[
                styles.targetTypeButton,
                targetType === 'USPSA' && styles.targetTypeButtonActive
              ]}
              onPress={() => setTargetType('USPSA')}
            >
              <Text style={[
                styles.targetTypeButtonText,
                targetType === 'USPSA' && styles.targetTypeButtonTextActive
              ]}>
                USPSA
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.targetTypeButton,
                targetType === 'IDPA' && styles.targetTypeButtonActive
              ]}
              onPress={() => setTargetType('IDPA')}
            >
              <Text style={[
                styles.targetTypeButtonText,
                targetType === 'IDPA' && styles.targetTypeButtonTextActive
              ]}>
                IDPA
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Camera or Preview */}
      <View style={styles.cameraContainer}>
        {capturedImage ? (
          <Image
            source={{ uri: capturedImage }}
            style={styles.preview}
            resizeMode="contain"
          />
        ) : (
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing="back"
          >
            <View style={styles.targetGuide}>
              <View style={styles.targetGuideCorner} style={[styles.targetGuideCorner, styles.topLeft]} />
              <View style={[styles.targetGuideCorner, styles.topRight]} />
              <View style={[styles.targetGuideCorner, styles.bottomLeft]} />
              <View style={[styles.targetGuideCorner, styles.bottomRight]} />
            </View>
          </CameraView>
        )}
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        {capturedImage ? (
          <>
            <TouchableOpacity
              style={styles.retakeButton}
              onPress={handleRetake}
              activeOpacity={0.8}
            >
              <IconSymbol
                ios_icon_name="arrow.clockwise"
                android_material_icon_name="refresh"
                size={24}
                color={colors.text}
              />
              <Text style={styles.retakeButtonText}>Retake</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.analyzeButton, isAnalyzing && styles.analyzeButtonDisabled]}
              onPress={handleAnalyze}
              disabled={isAnalyzing}
              activeOpacity={0.8}
            >
              {isAnalyzing ? (
                <>
                  <ActivityIndicator color={colors.background} />
                  <Text style={styles.analyzeButtonText}>Analyzing...</Text>
                </>
              ) : (
                <>
                  <IconSymbol
                    ios_icon_name="checkmark.circle.fill"
                    android_material_icon_name="check_circle"
                    size={24}
                    color={colors.background}
                  />
                  <Text style={styles.analyzeButtonText}>Analyze Target</Text>
                </>
              )}
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={styles.galleryButton}
              onPress={handlePickFromGallery}
              activeOpacity={0.8}
            >
              <IconSymbol
                ios_icon_name="photo.fill"
                android_material_icon_name="photo_library"
                size={32}
                color={colors.text}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.captureButton}
              onPress={handleTakePhoto}
              activeOpacity={0.8}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>

            <View style={{ width: 60 }} />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 48 : 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  skipHeaderButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  skipHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  instructionsContainer: {
    padding: 16,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  targetTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  targetTypeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  targetTypeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  targetTypeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  targetTypeButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  targetTypeButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  targetTypeButtonTextActive: {
    color: colors.background,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  camera: {
    flex: 1,
  },
  targetGuide: {
    flex: 1,
    margin: 40,
    borderWidth: 2,
    borderColor: colors.primary,
    borderStyle: 'dashed',
  },
  targetGuideCorner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: colors.primary,
  },
  topLeft: {
    top: -2,
    left: -2,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  topRight: {
    top: -2,
    right: -2,
    borderTopWidth: 4,
    borderRightWidth: 4,
  },
  bottomLeft: {
    bottom: -2,
    left: -2,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },
  bottomRight: {
    bottom: -2,
    right: -2,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
  preview: {
    flex: 1,
    backgroundColor: colors.background,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.secondary,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.card,
    borderWidth: 4,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButtonInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
  },
  galleryButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  retakeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.secondary,
    gap: 8,
    marginRight: 8,
  },
  retakeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  analyzeButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: colors.primary,
    gap: 8,
  },
  analyzeButtonDisabled: {
    opacity: 0.6,
  },
  analyzeButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.background,
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
    textAlign: 'center',
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
  skipButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
  skipButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
});
