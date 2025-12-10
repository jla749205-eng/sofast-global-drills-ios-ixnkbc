
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import { getDrillById } from '@/data/drills';
import { IconSymbol } from '@/components/IconSymbol';

export default function ResultsScreen() {
  const router = useRouter();
  const { id, time, shots, splits } = useLocalSearchParams<{
    id: string;
    time: string;
    shots: string;
    splits: string;
  }>();
  
  const drill = getDrillById(id);
  const totalTime = parseFloat(time || '0');
  const shotCount = parseInt(shots || '0', 10);
  const splitTimes = splits ? JSON.parse(splits) : [];
  
  const isPar = drill?.parTime ? totalTime <= drill.parTime : false;
  const averageSplit = splitTimes.length > 0 
    ? splitTimes.reduce((a: number, b: number) => a + b, 0) / splitTimes.length 
    : 0;

  const handleDone = () => {
    router.push('/(tabs)/(home)/');
  };

  const handleRetry = () => {
    router.back();
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
                  <Text style={styles.splitTime}>{split.toFixed(3)}s</Text>
                </View>
              ))}
            </View>
            <View style={styles.averageCard}>
              <Text style={styles.averageLabel}>Average Split</Text>
              <Text style={styles.averageValue}>{averageSplit.toFixed(3)}s</Text>
            </View>
          </View>
        )}

        {/* AI Analysis Placeholder */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI ANALYSIS</Text>
          <View style={styles.analysisCard}>
            <IconSymbol
              ios_icon_name="brain"
              android_material_icon_name="psychology"
              size={32}
              color={colors.primary}
            />
            <Text style={styles.analysisText}>
              AI-powered shot detection and form analysis coming soon. This will include muzzle flash detection, recoil pattern analysis, and flinch detection using Vision/Core ML.
            </Text>
          </View>
        </View>

        {/* Leaderboard Placeholder */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GLOBAL LEADERBOARD</Text>
          <View style={styles.leaderboardCard}>
            <IconSymbol
              ios_icon_name="trophy.fill"
              android_material_icon_name="emoji_events"
              size={32}
              color={colors.accent}
            />
            <Text style={styles.leaderboardText}>
              Firebase global rankings coming soon. Compete in Open, Vet, and LE divisions.
            </Text>
          </View>
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
          <Text style={styles.retryButtonText}>Retry Drill</Text>
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
    marginBottom: 24,
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
    borderWidth: 2,
    borderColor: colors.primary,
  },
  mainStatLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.textSecondary,
    letterSpacing: 1,
    marginBottom: 8,
  },
  mainStatValue: {
    fontSize: 36,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
  splitNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  splitTime: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  averageCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  averageLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  averageValue: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.primary,
  },
  analysisCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  analysisText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 12,
  },
  leaderboardCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  leaderboardText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 12,
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
