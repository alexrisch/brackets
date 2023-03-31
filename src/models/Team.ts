
export interface Matchup {
  matchupId: string;
  team1Name: string;
  team1Score: number;
  team2Name: string;
  team2Score: number;
  displayScore: boolean;
}

export interface Team {
  id: string;
  name: string;
  seed: number;
  description: string;
  history: Matchup[];
  canEdit: boolean;
}

