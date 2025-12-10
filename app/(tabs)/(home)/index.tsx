
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import { DRILLS } from '@/data/drills';
import { IconSymbol } from '@/components/IconSymbol';

export default function HomeScreen() {
  const router = useRouter();
  const [isPremium, setIsPremium] = useState(false); // TODO: Connect to RevenueCat

  const freeDrills = DRILLS.filter(d => !d.isPremium);
  const premiumDrills = DRILLS.filter(d => d.isPremium);

  const handleDrillPress = (drillId: string, isPremiumDrill: boolean) => {
    if (isPremiumDrill && !isPremium) {
      console.log('Premium subscription required');
      // TODO: Show subscription modal
      return;
    }
    router.push(`/drill/${drillId}`);
  };

  const renderDrill = (drill: typeof DRILLS[0]) => {
    const isLocked = drill.isPremium && !isPremium;
    
    return (
      <TouchableOpacity
        key={drill.id}
        style={[styles.drillCard, isLocked && styles.lockedCard]}
        onPress={() => handleDrillPress(drill.id, drill.isPremium)}
        activeOpacity={0.7}
      >
        <View style={styles.drillHeader}>
          <View style={styles.drillTitleContainer}>
            <Text style={styles.drillName}>{drill.name}</Text>
            {drill.isPremium && (
              <View style={styles.premiumBadge}>
                <IconSymbol
                  ios_icon_name="star.fill"
                  android_material_icon_name="star"
                  size={12}
                  color={colors.accent}
                />
                <Text style={styles.premiumText}>PRO</Text>
              </View>
            )}
          </View>
          {isLocked && (
            <IconSymbol
              ios_icon_name="lock.fill"
              android_material_icon_name="lock"
              size={24}
              color={colors.textSecondary}
            />
          )}
        </View>
        
        <Text style={styles.drillDescription}>{drill.description}</Text>
        
        <View style={styles.drillStats}>
          <View style={styles.statItem}>
            <IconSymbol
              ios_icon_name="target"
              android_material_icon_name="gps_fixed"
              size={16}
              color={colors.primary}
            />
            <Text style={styles.statText}>{drill.rounds} rounds</Text>
          </View>
          
          {drill.distance && (
            <View style={styles.statItem}>
              <IconSymbol
                ios_icon_name="ruler"
                android_material_icon_name="straighten"
                size={16}
                color={colors.primary}
              />
              <Text style={styles.statText}>{drill.distance}</Text>
            </View>
          )}
          
          {drill.parTime && (
            <View style={styles.statItem}>
              <IconSymbol
                ios_icon_name="timer"
                android_material_icon_name="timer"
                size={16}
                color={colors.primary}
              />
              <Text style={styles.statText}>{drill.parTime}s par</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>SOFAST</Text>
          <Text style={styles.subtitle}>Global Marksmanship Drills</Text>
        </View>

        {/* Free Drills Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FREE DRILLS</Text>
          {freeDrills.map(renderDrill)}
        </View>

        {/* Premium Drills Section */}
        <View style={styles.section}>
          <View style={styles.premiumHeader}>
            <Text style={styles.sectionTitle}>PREMIUM DRILLS</Text>
            {!isPremium && (
              <TouchableOpacity
                style={styles.upgradeButton}
                onPress={() => console.log('Show subscription')}
              >
                <Text style={styles.upgradeButtonText}>Upgrade $4.99/mo</Text>
              </TouchableOpacity>
            )}
          </View>
          {premiumDrills.map(renderDrill)}
        </View>

        {/* Bottom padding for tab bar */}
        <View style={{ height: 120 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Platform.OS === 'android' ? 48 : 60,
    paddingHorizontal: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    paddingVertical: 20,
  },
  logo: {
    fontSize: 48,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: 2,
    textShadowColor: colors.highlight,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    letterSpacing: 3,
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
  premiumHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  upgradeButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  upgradeButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.background,
  },
  drillCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  lockedCard: {
    opacity: 0.6,
  },
  drillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  drillTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  drillName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 4,
  },
  premiumText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.accent,
  },
  drillDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  drillStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
});
