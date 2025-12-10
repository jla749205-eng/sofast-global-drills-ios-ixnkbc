
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { LeaderboardService, Division } from '@/services/leaderboardService';
import { TargetAnalyzer } from '@/services/targetAnalyzer';

interface RankingEntry {
  rank: number;
  userName: string;
  classification: string;
  hitFactor: number;
  totalScore: number;
  drillsCompleted: number;
  division: Division;
  isCurrentUser?: boolean;
}

export default function RankingsScreen() {
  const router = useRouter();
  const [selectedDivision, setSelectedDivision] = useState<Division>('Open');
  const [rankings, setRankings] = useState<RankingEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userRanking, setUserRanking] = useState<RankingEntry | null>(null);

  useEffect(() => {
    loadRankings();
  }, [selectedDivision]);

  const loadRankings = async () => {
    try {
      setIsLoading(true);
      
      const leaderboardService = LeaderboardService.getInstance();
      const globalRankings = await leaderboardService.getGlobalRankings(selectedDivision);
      
      setRankings(globalRankings);
      
      // Find current user's ranking
      const currentUser = globalRankings.find(r => r.isCurrentUser);
      setUserRanking(currentUser || null);
      
    } catch (error) {
      console.error('Error loading rankings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getClassificationColor = (classification: string): string => {
    const analyzer = TargetAnalyzer.getInstance();
    return analyzer.getClassificationColor(classification);
  };

  const renderRankingItem = (entry: RankingEntry) => {
    const classificationColor = getClassificationColor(entry.classification);
    
    return (
      <View
        key={entry.rank}
        style={[
          styles.rankingCard,
          entry.isCurrentUser && styles.currentUserCard
        ]}
      >
        {/* Rank Badge */}
        <View style={[
          styles.rankBadge,
          entry.rank <= 3 && styles.topRankBadge
        ]}>
          {entry.rank <= 3 ? (
            <IconSymbol
              ios_icon_name={entry.rank === 1 ? 'crown.fill' : 'medal.fill'}
              android_material_icon_name={entry.rank === 1 ? 'emoji_events' : 'military_tech'}
              size={24}
              color={entry.rank === 1 ? '#FFD700' : entry.rank === 2 ? '#C0C0C0' : '#CD7F32'}
            />
          ) : (
            <Text style={styles.rankNumber}>{entry.rank}</Text>
          )}
        </View>

        {/* User Info */}
        <View style={styles.userInfo}>
          <View style={styles.userNameRow}>
            <Text style={[
              styles.userName,
              entry.isCurrentUser && styles.currentUserName
            ]}>
              {entry.userName}
            </Text>
            {entry.isCurrentUser && (
              <View style={styles.youBadge}>
                <Text style={styles.youBadgeText}>YOU</Text>
              </View>
            )}
          </View>
          
          <View style={styles.classificationRow}>
            <View style={[
              styles.classificationBadge,
              { backgroundColor: classificationColor }
            ]}>
              <Text style={styles.classificationText}>{entry.classification}</Text>
            </View>
            <Text style={styles.divisionText}>{entry.division}</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsColumn}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{entry.hitFactor.toFixed(2)}</Text>
            <Text style={styles.statLabel}>HF</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{entry.totalScore}</Text>
            <Text style={styles.statLabel}>Score</Text>
          </View>
        </View>
      </View>
    );
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
        <Text style={styles.headerTitle}>Global Rankings</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Division Selector */}
      <View style={styles.divisionSelector}>
        {(['Open', 'Vet', 'LE'] as Division[]).map((division) => (
          <TouchableOpacity
            key={division}
            style={[
              styles.divisionButton,
              selectedDivision === division && styles.divisionButtonActive
            ]}
            onPress={() => setSelectedDivision(division)}
          >
            <Text style={[
              styles.divisionButtonText,
              selectedDivision === division && styles.divisionButtonTextActive
            ]}>
              {division === 'LE' ? 'Law Enforcement' : division}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Classification Legend */}
      <View style={styles.legendContainer}>
        <Text style={styles.legendTitle}>CLASSIFICATIONS</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.legendScroll}
        >
          {['Grand Master', 'Master', 'Expert', 'Sharpshooter', 'Marksman', 'Novice'].map((classification) => (
            <View
              key={classification}
              style={[
                styles.legendItem,
                { borderColor: getClassificationColor(classification) }
              ]}
            >
              <View style={[
                styles.legendDot,
                { backgroundColor: getClassificationColor(classification) }
              ]} />
              <Text style={styles.legendText}>{classification}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Current User Ranking */}
      {userRanking && (
        <View style={styles.currentUserContainer}>
          <Text style={styles.currentUserTitle}>YOUR RANKING</Text>
          <View style={styles.currentUserStats}>
            <View style={styles.currentUserStatBox}>
              <Text style={styles.currentUserStatValue}>#{userRanking.rank}</Text>
              <Text style={styles.currentUserStatLabel}>Global Rank</Text>
            </View>
            <View style={styles.currentUserStatBox}>
              <Text style={[
                styles.currentUserStatValue,
                { color: getClassificationColor(userRanking.classification) }
              ]}>
                {userRanking.classification}
              </Text>
              <Text style={styles.currentUserStatLabel}>Classification</Text>
            </View>
            <View style={styles.currentUserStatBox}>
              <Text style={styles.currentUserStatValue}>{userRanking.hitFactor.toFixed(2)}</Text>
              <Text style={styles.currentUserStatLabel}>Hit Factor</Text>
            </View>
          </View>
        </View>
      )}

      {/* Rankings List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Loading rankings...</Text>
          </View>
        ) : (
          <>
            <Text style={styles.sectionTitle}>TOP SHOOTERS</Text>
            {rankings.map(renderRankingItem)}
            
            {/* Info Section */}
            <View style={styles.infoSection}>
              <IconSymbol
                ios_icon_name="info.circle.fill"
                android_material_icon_name="info"
                size={24}
                color={colors.primary}
              />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoTitle}>How Rankings Work</Text>
                <Text style={styles.infoText}>
                  Rankings are based on your Hit Factor (HF), calculated as Points ÷ Time. 
                  Complete drills with verified target photos to improve your classification and climb the leaderboard!
                </Text>
                <Text style={styles.infoText}>
                  Classifications follow USPSA standards:
                </Text>
                <Text style={styles.infoText}>
                  • Grand Master: 7.0+ HF{'\n'}
                  • Master: 5.5+ HF{'\n'}
                  • Expert: 4.0+ HF{'\n'}
                  • Sharpshooter: 2.5+ HF{'\n'}
                  • Marksman: 1.5+ HF{'\n'}
                  • Novice: Below 1.5 HF
                </Text>
              </View>
            </View>

            {/* Bottom padding */}
            <View style={{ height: 100 }} />
          </>
        )}
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
    borderWidth: 1,
    borderColor: colors.secondary,
    alignItems: 'center',
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
  legendContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  legendTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textSecondary,
    letterSpacing: 2,
    marginBottom: 8,
  },
  legendScroll: {
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: colors.card,
    borderWidth: 2,
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.text,
  },
  currentUserContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  currentUserTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textSecondary,
    letterSpacing: 2,
    marginBottom: 12,
  },
  currentUserStats: {
    flexDirection: 'row',
    gap: 12,
  },
  currentUserStatBox: {
    flex: 1,
    alignItems: 'center',
  },
  currentUserStatValue: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.primary,
  },
  currentUserStatLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.textSecondary,
    letterSpacing: 2,
    marginBottom: 12,
  },
  rankingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.secondary,
    gap: 12,
  },
  currentUserCard: {
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.card,
  },
  rankBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  topRankBadge: {
    borderColor: colors.primary,
  },
  rankNumber: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.text,
  },
  userInfo: {
    flex: 1,
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  currentUserName: {
    color: colors.primary,
  },
  youBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  youBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.background,
  },
  classificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  classificationBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  classificationText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.background,
  },
  divisionText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  statsColumn: {
    alignItems: 'flex-end',
    gap: 4,
  },
  statItem: {
    alignItems: 'flex-end',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 12,
  },
  infoSection: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: colors.primary,
    gap: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 8,
  },
});
