export type Match = {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  homeTeamScore: number;
  awayTeamScore: number;
  startedAt: Date;
  finishedAt: Date | null;
};
