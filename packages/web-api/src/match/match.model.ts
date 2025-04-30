export type Match = {
  id: string;
  teamHomeId: string;
  teamAwayId: string;
  teamHomeScore: number;
  teamAwayScore: number;
  startedAt: Date;
  finishedAt: Date | null;
};
