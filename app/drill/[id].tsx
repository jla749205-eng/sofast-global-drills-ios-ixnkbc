
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import { getDrillById } from '@/data/drills';
import { IconSymbol } from '@/components/IconSymbol';

export default function DrillDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const drill = getDrillById(id);

  if (!drill) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Drill not found</Text>
      </View>
    );
  }

  const handleStartDrill = () => {
    console.log('Starting drill:', drill.id);
    router.push(`/camera/${drill.id}`);
  };

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
        <Text style={styles.headerTitle}>Drill Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Drill Title */}
        <View style={styles.titleSection}>
          <Text style={styles.drillName}>{drill.name}</Text>
          <Text style={styles.drillDescription}>{drill.description}</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <IconSymbol
              ios_icon_name="target"
              android_material_icon_name="gps_fixed"
              size={32}
              color={colors.primary}
            />
            <Text style={styles.statValue}>{drill.rounds}</Text>
            <Text style={styles.statLabel}>Rounds</Text>
          </View>

          {drill.distance && (
            <View style={styles.statCard}>
              <IconSymbol
                ios_icon_name="ruler"
                android_material_icon_name="straighten"
                size={32}
                color={colors.primary}
              />
              <Text style={styles.statValue}>{drill.distance}</Text>
              <Text style={styles.statLabel}>Distance</Text>
            </View>
          )}

          {drill.parTime && (
            <View style={styles.statCard}>
              <IconSymbol
                ios_icon_name="timer"
                android_material_icon_name="timer"
                size={32}
                color={colors.primary}
              />
              <Text style={styles.statValue}>{drill.parTime}s</Text>
              <Text style={styles.statLabel}>Par Time</Text>
            </View>
          )}
        </View>

        {/* Instructions */}
        <View style={styles.instructionsSection}>
          <Text style={styles.sectionTitle}>INSTRUCTIONS</Text>
          {drill.instructions.map((instruction, index) => (
            <View key={index} style={styles.instructionItem}>
              <View style={styles.instructionNumber}>
                <Text style={styles.instructionNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.instructionText}>{instruction}</Text>
            </View>
          ))}
        </View>

        {/* Safety Notice */}
        <View style={styles.safetyNotice}>
          <IconSymbol
            ios_icon_name="exclamationmark.triangle.fill"
            android_material_icon_name="warning"
            size={24}
            color={colors.accent}
          />
          <Text style={styles.safetyText}>
            Always follow proper firearm safety protocols. Ensure a safe backstop and clear range before beginning.
          </Text>
        </View>

        {/* Bottom padding */}
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Start Button */}
      <View style={styles.startButtonContainer}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartDrill}
          activeOpacity={0.8}
        >
          <IconSymbol
            ios_icon_name="play.circle.fill"
            android_material_icon_name="play_circle"
            size={28}
            color={colors.background}
          />
          <Text style={styles.startButtonText}>START DRILL</Text>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  titleSection: {
    marginBottom: 24,
  },
  drillName: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 8,
  },
  drillDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 32,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
    fontWeight: '600',
  },
  instructionsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.textSecondary,
    letterSpacing: 2,
    marginBottom: 16,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  instructionNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  instructionNumberText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.background,
  },
  instructionText: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
  safetyNotice: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: colors.accent,
    gap: 12,
  },
  safetyText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  errorText: {
    fontSize: 18,
    color: colors.text,
    textAlign: 'center',
    marginTop: 100,
  },
  startButtonContainer: {
    padding: 16,
    paddingBottom: Platform.OS === 'android' ? 24 : 32,
    borderTopWidth: 1,
    borderTopColor: colors.secondary,
  },
  startButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 12,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.background,
    letterSpacing: 1,
  },
});
