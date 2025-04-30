import type { Match } from '../match/match.model';
import { ScoreboardService } from './scoreboard.service';

describe('sort matches', () => {
  test('test from pdf', () => {
    const matches: Omit<Match, 'id' | 'finishedAt'>[] = [
      {
        homeTeamId: 'mexico',
        awayTeamId: 'canada',
        homeTeamScore: 0,
        awayTeamScore: 5,
        startedAt: new Date('2024-01-01T12:00:00Z'),
      },
      {
        homeTeamId: 'spain',
        awayTeamId: 'brazil',
        homeTeamScore: 10,
        awayTeamScore: 2,
        startedAt: new Date('2024-01-01T13:00:00Z'),
      },
      {
        homeTeamId: 'germany',
        awayTeamId: 'france',
        homeTeamScore: 2,
        awayTeamScore: 2,
        startedAt: new Date('2024-01-01T14:00:00Z'),
      },
      {
        homeTeamId: 'uruguay',
        awayTeamId: 'italy',
        homeTeamScore: 6,
        awayTeamScore: 6,
        startedAt: new Date('2024-01-01T15:00:00Z'),
      },
      {
        homeTeamId: 'argentina',
        awayTeamId: 'australia',
        homeTeamScore: 3,
        awayTeamScore: 1,
        startedAt: new Date('2024-01-01T16:00:00Z'),
      },
    ];

    const sortedMatches = ScoreboardService.sortMatches(matches as Match[]);
    const expectedMatches = [
      {
        homeTeamId: 'uruguay',
        awayTeamId: 'italy',
        homeTeamScore: 6,
        awayTeamScore: 6,
      },
      {
        homeTeamId: 'spain',
        awayTeamId: 'brazil',
        homeTeamScore: 10,
        awayTeamScore: 2,
      },
      {
        homeTeamId: 'mexico',
        awayTeamId: 'canada',
        homeTeamScore: 0,
        awayTeamScore: 5,
      },
      {
        homeTeamId: 'argentina',
        awayTeamId: 'australia',
        homeTeamScore: 3,
        awayTeamScore: 1,
      },
      {
        homeTeamId: 'germany',
        awayTeamId: 'france',
        homeTeamScore: 2,
        awayTeamScore: 2,
      },
    ];

    expect(sortedMatches).toMatchObject(expectedMatches);
  });
});
