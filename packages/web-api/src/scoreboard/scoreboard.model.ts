export type Scoreboard = {
  matches: {
    id: string;
    homeTeam: {
      id: string;
      name: string;
      score: number;
    };
    awayTeam: {
      id: string;
      name: string;
      score: number;
    };
    startedAt: Date;
  }[];
};
