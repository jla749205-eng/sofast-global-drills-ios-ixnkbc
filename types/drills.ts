
export interface Drill {
  id: string;
  name: string;
  description: string;
  parTime?: number; // in seconds
  rounds: number;
  distance?: string;
  instructions: string[];
  isPremium: boolean;
}

export interface DrillResult {
  drillId: string;
  drillName: string;
  timestamp: number;
  totalTime: number;
  splits: number[];
  hits: number;
  misses: number;
  score: number;
  division: 'Open' | 'Vet' | 'LE';
  flinchDetected: boolean;
  targetAnalysis?: {
    totalPoints: number;
    accuracy: number;
    alphaHits: number;
    charlieHits: number;
    deltaHits: number;
    targetType: 'USPSA' | 'IDPA';
  };
  classification?: string;
  hitFactor?: number;
}

export interface LeaderboardEntry {
  userId: string;
  userName: string;
  drillId: string;
  score: number;
  totalTime: number;
  division: 'Open' | 'Vet' | 'LE';
  timestamp: number;
  isVeteran: boolean;
}
