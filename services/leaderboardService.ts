
// Global leaderboard service with rankings support
// Manages score submissions, leaderboards, and global rankings
// Note: This is a placeholder implementation with mock data
// To fully implement, you would need to:
// 1. Set up a backend (Supabase recommended)
// 2. Enable database with proper schema
// 3. Configure authentication
// 4. Add real-time sync capabilities

import { DrillResult, LeaderboardEntry } from '@/types/drills';

export type Division = 'Open' | 'Vet' | 'LE';

interface GlobalRankingEntry {
  rank: number;
  userName: string;
  classification: string;
  hitFactor: number;
  totalScore: number;
  drillsCompleted: number;
  division: Division;
  isCurrentUser?: boolean;
}

export class LeaderboardService {
  private static instance: LeaderboardService;
  private cachedResults: Map<string, LeaderboardEntry[]> = new Map();
  private cachedRankings: Map<Division, GlobalRankingEntry[]> = new Map();
  private pendingUploads: DrillResult[] = [];
  private currentUserId: string = 'current-user-123'; // Mock user ID

  private constructor() {
    console.log('LeaderboardService initialized');
    this.initializeMockData();
  }

  static getInstance(): LeaderboardService {
    if (!LeaderboardService.instance) {
      LeaderboardService.instance = new LeaderboardService();
    }
    return LeaderboardService.instance;
  }

  async initialize() {
    try {
      // TODO: Initialize backend connection (Supabase)
      // await supabase.auth.initialize();
      console.log('Leaderboard service initialized');
      
      // Load cached data
      await this.loadCachedData();
    } catch (error) {
      console.error('Error initializing leaderboard service:', error);
    }
  }

  async submitScore(result: DrillResult): Promise<boolean> {
    try {
      console.log('Submitting score:', result);
      
      // TODO: Upload to backend
      // const { data, error } = await supabase
      //   .from('leaderboard')
      //   .insert({
      //     drill_id: result.drillId,
      //     user_id: this.currentUserId,
      //     score: result.score,
      //     total_time: result.totalTime,
      //     hit_factor: result.hitFactor,
      //     division: result.division,
      //     classification: result.classification,
      //     timestamp: result.timestamp,
      //   });

      // For now, cache locally for offline support
      this.pendingUploads.push(result);
      await this.savePendingUploads();
      
      // Update cached rankings
      await this.updateCachedRankings(result);
      
      return true;
    } catch (error) {
      console.error('Error submitting score:', error);
      
      // Queue for later upload
      this.pendingUploads.push(result);
      await this.savePendingUploads();
      
      return false;
    }
  }

  async getLeaderboard(drillId: string, division: Division, limit: number = 100): Promise<LeaderboardEntry[]> {
    try {
      console.log(`Fetching leaderboard for ${drillId}, division: ${division}`);
      
      // Check cache first
      const cacheKey = `${drillId}_${division}`;
      if (this.cachedResults.has(cacheKey)) {
        return this.cachedResults.get(cacheKey)!;
      }

      // TODO: Fetch from backend
      // const { data, error } = await supabase
      //   .from('leaderboard')
      //   .select('*')
      //   .eq('drill_id', drillId)
      //   .eq('division', division)
      //   .order('score', { ascending: false })
      //   .limit(limit);

      // For now, return mock data
      const mockEntries = this.generateMockLeaderboard(drillId, division, limit);
      this.cachedResults.set(cacheKey, mockEntries);
      return mockEntries;
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      return [];
    }
  }

  async getGlobalRankings(division: Division, limit: number = 100): Promise<GlobalRankingEntry[]> {
    try {
      console.log(`Fetching global rankings for division: ${division}`);
      
      // Check cache first
      if (this.cachedRankings.has(division)) {
        return this.cachedRankings.get(division)!;
      }

      // TODO: Fetch from backend
      // const { data, error } = await supabase
      //   .from('user_rankings')
      //   .select('*')
      //   .eq('division', division)
      //   .order('hit_factor', { ascending: false })
      //   .limit(limit);

      // For now, return mock data
      const mockRankings = this.generateMockRankings(division, limit);
      this.cachedRankings.set(division, mockRankings);
      return mockRankings;
    } catch (error) {
      console.error('Error fetching global rankings:', error);
      return [];
    }
  }

  async syncPendingUploads(): Promise<number> {
    try {
      console.log(`Syncing ${this.pendingUploads.length} pending uploads`);
      
      let successCount = 0;
      const failedUploads: DrillResult[] = [];

      for (const result of this.pendingUploads) {
        const success = await this.submitScore(result);
        if (success) {
          successCount++;
        } else {
          failedUploads.push(result);
        }
      }

      this.pendingUploads = failedUploads;
      await this.savePendingUploads();

      console.log(`Synced ${successCount} scores, ${failedUploads.length} failed`);
      return successCount;
    } catch (error) {
      console.error('Error syncing pending uploads:', error);
      return 0;
    }
  }

  private initializeMockData() {
    // Initialize mock rankings for all divisions
    const divisions: Division[] = ['Open', 'Vet', 'LE'];
    divisions.forEach(division => {
      const mockRankings = this.generateMockRankings(division, 100);
      this.cachedRankings.set(division, mockRankings);
    });
  }

  private generateMockLeaderboard(drillId: string, division: Division, limit: number): LeaderboardEntry[] {
    const names = [
      'John Smith', 'Sarah Johnson', 'Mike Davis', 'Emily Wilson', 'Chris Brown',
      'Jessica Lee', 'David Martinez', 'Amanda Garcia', 'James Rodriguez', 'Lisa Anderson',
      'Robert Taylor', 'Jennifer Thomas', 'Michael Moore', 'Michelle Jackson', 'William White',
    ];

    const entries: LeaderboardEntry[] = [];
    
    for (let i = 0; i < Math.min(limit, 15); i++) {
      entries.push({
        userId: `user-${i}`,
        userName: names[i % names.length],
        drillId,
        score: Math.floor(95 - (i * 3) - (Math.random() * 5)),
        totalTime: 8.0 + (i * 0.5) + (Math.random() * 0.5),
        division,
        timestamp: Date.now() - (i * 86400000),
        isVeteran: division === 'Vet',
      });
    }

    return entries;
  }

  private generateMockRankings(division: Division, limit: number): GlobalRankingEntry[] {
    const names = [
      'John Smith', 'Sarah Johnson', 'Mike Davis', 'Emily Wilson', 'Chris Brown',
      'Jessica Lee', 'David Martinez', 'Amanda Garcia', 'James Rodriguez', 'Lisa Anderson',
      'Robert Taylor', 'Jennifer Thomas', 'Michael Moore', 'Michelle Jackson', 'William White',
      'Daniel Harris', 'Ashley Martin', 'Matthew Thompson', 'Stephanie Clark', 'Kevin Lee',
      'You', // Current user
    ];

    const rankings: GlobalRankingEntry[] = [];
    
    for (let i = 0; i < Math.min(limit, names.length); i++) {
      const hitFactor = 8.0 - (i * 0.3) - (Math.random() * 0.2);
      const classification = this.getClassificationFromHitFactor(hitFactor);
      const isCurrentUser = names[i] === 'You';
      
      rankings.push({
        rank: i + 1,
        userName: names[i],
        classification,
        hitFactor: Math.max(0.5, hitFactor),
        totalScore: Math.floor(1000 - (i * 40) - (Math.random() * 30)),
        drillsCompleted: Math.floor(50 - (i * 2) + (Math.random() * 10)),
        division,
        isCurrentUser,
      });
    }

    return rankings;
  }

  private getClassificationFromHitFactor(hitFactor: number): string {
    if (hitFactor >= 7.0) return 'Grand Master';
    if (hitFactor >= 5.5) return 'Master';
    if (hitFactor >= 4.0) return 'Expert';
    if (hitFactor >= 2.5) return 'Sharpshooter';
    if (hitFactor >= 1.5) return 'Marksman';
    return 'Novice';
  }

  private async updateCachedRankings(result: DrillResult) {
    try {
      // Update cached rankings with new result
      const division = result.division;
      const rankings = this.cachedRankings.get(division) || [];
      
      // Find or create user entry
      const userIndex = rankings.findIndex(r => r.isCurrentUser);
      const hitFactor = result.hitFactor || 0;
      
      if (userIndex >= 0) {
        // Update existing entry
        rankings[userIndex].hitFactor = hitFactor;
        rankings[userIndex].totalScore += result.score;
        rankings[userIndex].drillsCompleted += 1;
        rankings[userIndex].classification = this.getClassificationFromHitFactor(hitFactor);
      } else {
        // Add new entry
        rankings.push({
          rank: rankings.length + 1,
          userName: 'You',
          classification: this.getClassificationFromHitFactor(hitFactor),
          hitFactor,
          totalScore: result.score,
          drillsCompleted: 1,
          division,
          isCurrentUser: true,
        });
      }
      
      // Re-sort and update ranks
      rankings.sort((a, b) => b.hitFactor - a.hitFactor);
      rankings.forEach((entry, index) => {
        entry.rank = index + 1;
      });
      
      this.cachedRankings.set(division, rankings);
    } catch (error) {
      console.error('Error updating cached rankings:', error);
    }
  }

  private async loadCachedData() {
    try {
      // TODO: Load from AsyncStorage or local storage
      // const cachedData = await AsyncStorage.getItem('leaderboard_cache');
      // if (cachedData) {
      //   const parsed = JSON.parse(cachedData);
      //   this.cachedResults = new Map(parsed.results);
      //   this.cachedRankings = new Map(parsed.rankings);
      // }
      console.log('Loading cached leaderboard data');
    } catch (error) {
      console.error('Error loading cached data:', error);
    }
  }

  private async savePendingUploads() {
    try {
      // TODO: Save to AsyncStorage or local storage
      // await AsyncStorage.setItem('pending_uploads', JSON.stringify(this.pendingUploads));
      console.log('Saving pending uploads');
    } catch (error) {
      console.error('Error saving pending uploads:', error);
    }
  }

  getPendingUploadCount(): number {
    return this.pendingUploads.length;
  }
}
