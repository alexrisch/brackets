
export interface BracketMatchup {
  id: string;
  team1Id: string;
  team2Id: string;
  completed: boolean;
}

export interface BracketTeam {
  id: string;
  name: string;
  image?: string;
  seed: string;
  description: string;
  eliminated: boolean;
}

export interface BracketColumnContent {
  title: string;
  matchups: BracketMatchup[];
}

export interface Bracket {
  id: string;
  name: string;
  description: string;
  category?: string;
  imageSource?: string;
  creator: string;
  canEdit: boolean;
  teams: BracketTeam[];
  columns: BracketColumnContent[];
}
