
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Image } from 'react-native';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

type Division = 'Open' | 'Vet' | 'LE';

export default function LeaderboardScreen() {
  const [selectedDivision, setSelectedDivision] = useState<Division>('Open');

  const divisions: Division[] = ['Open', 'Vet', 'LE'];

  // Placeholder leaderboard data
  const leaderboardData = [
    { rank: 1, name: 'John Doe', score: 95.5, time: 8.23, isVeteran: false },
    { rank: 2, name: 'Jane Smith', score: 94.2, time: 8.45, isVeteran: true },
    { rank: 3, name: 'Mike Johnson', score: 93.8, time: 8.67, isVeteran: false },
    { rank: 4, name: 'Sarah Williams', score: 92.5, time: 8.89, isVeteran: false },
    { rank: 5, name: 'Tom Brown', score: 91.3, time: 9.12, isVeteran: true },
  ];

  return (
    <View style={styles.container}>
      {/* Header with Logo */}
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/7cadd481-5bea-470d-802a-1f44d5a96178.jpeg')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>Global Leaderboard</Text>
        <Text style={styles.headerSubtitle}>Compete with shooters worldwide</Text>
      </View>

      {/* Division Selector */}
      <View style={styles.divisionSelector}>
        {divisions.map((division) => (
          <TouchableOpacity
            key={division}
            style={[
              styles.divisionButton,
              selectedDivision === division && styles.divisionButtonActive
            ]}
            onPress={() => setSelectedDivision(division)}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.divisionButtonText,
              selectedDivision === division && styles.divisionButtonTextActive
            ]}>
              {division}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Coming Soon Notice */}
        <View style={styles.comingSoonCard}>
          <IconSymbol
            ios_icon_name="cloud.fill"
            android_material_icon_name="cloud"
            size={48}
            color={colors.primary}
          />
          <Text style={styles.comingSoonTitle}>Firebase Integration Coming Soon</Text>
          <Text style={styles.comingSoonText}>
            Global rankings with real-time updates will be available in the next update. 
            Compete in Open, Veteran, and Law Enforcement divisions.
          </Text>
        </View>

        {/* Placeholder Leaderboard */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PREVIEW - {selectedDivision.toUpperCase()} DIVISION</Text>
          
          {leaderboardData.map((entry) => (
            <View key={entry.rank} style={styles.leaderboardItem}>
              <View style={styles.rankContainer}>
                {entry.rank <= 3 ? (
                  <IconSymbol
                    ios_icon_name="trophy.fill"
                    android_material_icon_name="emoji_events"
                    size={24}
                    color={
                      entry.rank === 1 ? '#FFD700' :
                      entry.rank === 2 ? '#C0C0C0' :
                      '#CD7F32'
                    }
                  />
                ) : (
                  <Text style={styles.rankNumber}>{entry.rank}</Text>
                )}
              </View>

              <View style={styles.playerInfo}>
                <View style={styles.playerNameContainer}>
                  <Text style={styles.playerName}>{entry.name}</Text>
                  {entry.isVeteran && (
                    <View style={styles.veteranBadge}>
                      <IconSymbol
                        ios_icon_name="star.fill"
                        android_material_icon_name="star"
                        size={12}
                        color={colors.accent}
                      />
                    </View>
                  )}
                </View>
                <View style={styles.playerStats}>
                  <Text style={styles.playerStatText}>Score: {entry.score}</Text>
                  <Text style={styles.playerStatText}>Time: {entry.time}s</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Features List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>UPCOMING FEATURES</Text>
          
          <View style={styles.featureCard}>
            <IconSymbol
              ios_icon_name="checkmark.circle.fill"
              android_material_icon_name="check_circle"
              size={24}
              color={colors.primary}
            />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Real-time Rankings</Text>
              <Text style={styles.featureText}>
                See your position update instantly as you complete drills
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <IconSymbol
              ios_icon_name="person.3.fill"
              android_material_icon_name="groups"
              size={24}
              color={colors.primary}
            />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Division Brackets</Text>
              <Text style={styles.featureText}>
                Compete fairly in Open, Veteran, and Law Enforcement divisions
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <IconSymbol
              ios_icon_name="chart.bar.fill"
              android_material_icon_name="bar_chart"
              size={24}
              color={colors.primary}
            />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Performance Analytics</Text>
              <Text style={styles.featureText}>
                Track your progress and compare with top shooters
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <IconSymbol
              ios_icon_name="wifi"
              android_material_icon_name="wifi"
              size={24}
              color={colors.primary}
            />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Offline Sync</Text>
              <Text style={styles.featureText}>
                Record drills offline and sync when connected
              </Text>
            </View>
          </View>
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
  header: {
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 48 : 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
  logoImage: {
    width: 60,
    height: 60,
    marginBottom: 12,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  divisionSelector: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  divisionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: colors.card,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  divisionButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  divisionButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  divisionButtonTextActive: {
    color: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  comingSoonCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  comingSoonTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  comingSoonText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.textSecondary,
    letterSpacing: 2,
    marginBottom: 12,
  },
  leaderboardItem: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rankNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  playerInfo: {
    flex: 1,
  },
  playerNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  veteranBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerStats: {
    flexDirection: 'row',
    gap: 16,
  },
  playerStatText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'flex-start',
    gap: 12,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
