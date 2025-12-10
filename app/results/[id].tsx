
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import { getDrillById } from '@/data/drills';
import { IconSymbol } from '@/components/IconSymbol';
import { LeaderboardService, Division } from '@/services/leaderboardService';
import { DrillResult } from '@/types/drills';

export default function ResultsScreen() {
  const router = useRouter();
  const { id, time, shots, splits, flinches } = useLocalSearchParams<{
    id: string;
    time: string;
    shots: string;
    splits: string;
    flinches?: string;
  }>();
  
  const drill = getDrillById(id);
  const totalTime = parseFloat(time || '0');
  const shotCount = parseInt(shots || '0', 10);
  const splitTimes = splits ? JSON.parse(splits) : [];
  const flinchCount = parseInt(flinches || '0', 10);
  
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  const isPar = drill?.parTime ? totalTime <= drill.parTime : false;
  const averageSplit = splitTimes.length > 0 
    ? splitTimes.reduce((a: number, b: number) => a + b, 0) / splitTimes.length 
    : 0;
  
  const fastestSplit = splitTimes.length > 0 ? Math.min(...splitTimes) : 0;
  const slowestSplit = splitTimes.length > 0 ? Math.max(...splitTimes) : 0;

  // Calculate score (simple scoring: 100 - time penalty - miss penalty - flinch penalty)
  const calculateScore = () => {
    let score = 100;
    
    // Time penalty
    if (drill?.parTime) {
      const timeDiff = totalTime - drill.parTime;
      if (timeDiff > 0) {
        score -= timeDiff * 2; // -2 points per second over par
      }
    }
    
    // Miss penalty
    const expectedShots = drill?.rounds || shotCount;
    if (shotCount < expectedShots) {
      score -= (expectedShots - shotCount) * 5; // -5 points per missed shot
    }
    
    // Flinch penalty
    score -= flinchCount * 3; // -3 points per flinch
    
    return Math.max(0, Math.round(score));
  };

  const score = calculateScore();

  const handleUploadScore = async () => {
    try {
      setIsUploading(true);
      
      const result: DrillResult = {
        drillId: drill?.id || '',
        drillName: drill?.name || '',
        timestamp: Date.now(),
        totalTime,
        splits: splitTimes,
        hits: shotCount,
        misses: (drill?.rounds || 0) - shotCount,
        score,
        division: 'Open', // TODO: Let user select division
        flinchDetected: flinchCount > 0,
      };

      const leaderboardService = LeaderboardService.getInstance();
      const success = await leaderboardService.submitScore(result);
      
      setUploadSuccess(success);
      setIsUploading(false);
      
      if (success) {
        Alert.alert('Success', 'Your score has been uploaded to the global leaderboard!');
      } else {
        Alert.alert('Queued', 'Your score will be uploaded when you have an internet connection.');
      }
    } catch (error) {
      console.error('Error uploading score:', error);
      setIsUploading(false);
      Alert.alert('Error', 'Failed to upload score. It will be queued for later.');
    }
  };

  const handleDone = () => {
    router.push('/(tabs)/(home)/');
  };

  const handleRetry = () => {
    router.back();
  };

  const handleViewLeaderboard = () => {
    router.push({
      pathname: '/leaderboard/[id]',
      params: { id: drill?.id || '' }
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Drill Complete</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Drill Name */}
        <Text style={styles.drillName}>{drill?.name}</Text>

        {/* Score Badge */}
        <View style={styles.scoreBadge}>
          <Text style={styles.scoreLabel}>SCORE</Text>
          <Text style={styles.scoreValue}>{score}</Text>
          <Text style={styles.scoreMax}>/ 100</Text>
        </View>

        {/* Main Stats */}
        <View style={styles.mainStatsContainer}>
          <View style={styles.mainStatCard}>
            <Text style={styles.mainStatLabel}>TOTAL TIME</Text>
            <Text style={[
              styles.mainStatValue,
              isPar && styles.parTime
            ]}>
              {totalTime.toFixed(2)}s
            </Text>
            {drill?.parTime && (
              <Text style={[
                styles.parIndicator,
                isPar && styles.parIndicatorSuccess
              ]}>
                {isPar ? '✓ UNDER PAR' : `+${(totalTime - drill.parTime).toFixed(2)}s`}
              </Text>
            )}
          </View>

          <View style={styles.mainStatCard}>
            <Text style={styles.mainStatLabel}>SHOTS FIRED</Text>
            <Text style={styles.mainStatValue}>{shotCount}</Text>
            <Text style={styles.subStatText}>
              of {drill?.rounds} rounds
            </Text>
          </View>
        </View>

        {/* Split Times */}
        {splitTimes.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SPLIT TIMES</Text>
            <View style={styles.splitsContainer}>
              {splitTimes.map((split: number, index: number) => (
                <View key={index} style={styles.splitItem}>
                  <Text style={styles.splitNumber}>#{index + 1}</Text>
                  <View style={styles.splitBar}>
                    <View 
                      style={[
                        styles.splitBarFill,
                        { width: `${(split / slowestSplit) * 100}%` }
                      ]} 
                    />
                  </View>
                  <Text style={styles.splitTime}>{split.toFixed(3)}s</Text>
                </View>
              ))}
            </View>
            <View style={styles.splitStatsRow}>
              <View style={styles.splitStatCard}>
                <Text style={styles.splitStatLabel}>Average</Text>
                <Text style={styles.splitStatValue}>{averageSplit.toFixed(3)}s</Text>
              </View>
              <View style={styles.splitStatCard}>
                <Text style={styles.splitStatLabel}>Fastest</Text>
                <Text style={styles.splitStatValue}>{fastestSplit.toFixed(3)}s</Text>
              </View>
              <View style={styles.splitStatCard}>
                <Text style={styles.splitStatLabel}>Slowest</Text>
                <Text style={styles.splitStatValue}>{slowestSplit.toFixed(3)}s</Text>
              </View>
            </View>
          </View>
        )}

        {/* AI Analysis */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI ANALYSIS</Text>
          <View style={styles.analysisCard}>
            <View style={styles.analysisHeader}>
              <IconSymbol
                ios_icon_name="brain"
                android_material_icon_name="psychology"
                size={32}
                color={colors.primary}
              />
              <Text style={styles.analysisTitle}>Shot Detection</Text>
            </View>
            <View style={styles.analysisStats}>
              <View style={styles.analysisStatItem}>
                <IconSymbol
                  ios_icon_name="waveform"
                  android_material_icon_name="graphic_eq"
                  size={20}
                  color={colors.textSecondary}
                />
                <Text style={styles.analysisStatText}>Audio + Gyro Detection</Text>
              </View>
              {flinchCount > 0 && (
                <View style={styles.analysisStatItem}>
                  <IconSymbol
                    ios_icon_name="exclamationmark.triangle.fill"
                    android_material_icon_name="warning"
                    size={20}
                    color={colors.accent}
                  />
                  <Text style={styles.analysisStatText}>{flinchCount} Flinch{flinchCount > 1 ? 'es' : ''} Detected</Text>
                </View>
              )}
              <View style={styles.analysisStatItem}>
                <IconSymbol
                  ios_icon_name="checkmark.circle.fill"
                  android_material_icon_name="check_circle"
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.analysisStatText}>{shotCount} Shots Confirmed</Text>
              </View>
            </View>
            <Text style={styles.analysisNote}>
              Advanced muzzle flash detection and form analysis coming in future updates.
            </Text>
          </View>
        </View>

        {/* Upload to Leaderboard */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GLOBAL LEADERBOARD</Text>
          <TouchableOpacity
            style={[styles.uploadButton, uploadSuccess && styles.uploadButtonSuccess]}
            onPress={handleUploadScore}
            disabled={isUploading || uploadSuccess}
            activeOpacity={0.8}
          >
            <IconSymbol
              ios_icon_name={uploadSuccess ? "checkmark.circle.fill" : "arrow.up.circle.fill"}
              android_material_icon_name={uploadSuccess ? "check_circle" : "cloud_upload"}
              size={24}
              color={uploadSuccess ? colors.primary : colors.text}
            />
            <Text style={[styles.uploadButtonText, uploadSuccess && styles.uploadButtonTextSuccess]}>
              {isUploading ? 'Uploading...' : uploadSuccess ? 'Score Uploaded!' : 'Upload to Leaderboard'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.viewLeaderboardButton}
            onPress={handleViewLeaderboard}
            activeOpacity={0.8}
          >
            <IconSymbol
              ios_icon_name="trophy.fill"
              android_material_icon_name="emoji_events"
              size={20}
              color={colors.accent}
            />
            <Text style={styles.viewLeaderboardText}>View Leaderboard</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom padding */}
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={handleRetry}
          activeOpacity={0.8}
        >
          <IconSymbol
            ios_icon_name="arrow.clockwise"
            android_material_icon_name="refresh"
            size={24}
            color={colors.text}
          />
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.doneButton}
          onPress={handleDone}
          activeOpacity={0.8}
        >
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 48 : 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  drillName: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  scoreBadge: {
    alignSelf: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    marginBottom: 24,
    minWidth: 160,
  },
  scoreLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.textSecondary,
    letterSpacing: 2,
  },
  scoreValue: {
    fontSize: 56,
    fontWeight: '900',
    color: colors.primary,
    marginVertical: 4,
  },
  scoreMax: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  mainStatsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  mainStatCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  mainStatLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.textSecondary,
    letterSpacing: 1,
    marginBottom: 8,
  },
  mainStatValue: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.text,
  },
  parTime: {
    color: colors.primary,
  },
  parIndicator: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.accent,
    marginTop: 8,
  },
  parIndicatorSuccess: {
    color: colors.primary,
  },
  subStatText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.textSecondary,
    letterSpacing: 2,
    marginBottom: 12,
  },
  splitsContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  splitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 12,
  },
  splitNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    width: 32,
  },
  splitBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.secondary,
    borderRadius: 4,
    overflow: 'hidden',
  },
  splitBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  splitTime: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    width: 80,
    textAlign: 'right',
  },
  splitStatsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  splitStatCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  splitStatLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  splitStatValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  analysisCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  analysisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  analysisTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  analysisStats: {
    gap: 12,
    marginBottom: 16,
  },
  analysisStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  analysisStatText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  analysisNote: {
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: 'italic',
    lineHeight: 18,
  },
  uploadButton: {
    backgroundColor: colors.card,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    marginBottom: 12,
  },
  uploadButtonSuccess: {
    borderColor: colors.primary,
    backgroundColor: colors.card,
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  uploadButtonTextSuccess: {
    color: colors.primary,
  },
  viewLeaderboardButton: {
    backgroundColor: colors.card,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  viewLeaderboardText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: Platform.OS === 'android' ? 24 : 32,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: colors.secondary,
  },
  retryButton: {
    flex: 1,
    backgroundColor: colors.card,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  doneButton: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.background,
  },
});
