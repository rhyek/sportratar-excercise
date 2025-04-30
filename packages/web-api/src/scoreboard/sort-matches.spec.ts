import type { Match } from '../match/match.model';
import { ScoreboardService } from './scoreboard.service';

describe('sort matches', () => {
  test('test from pdf', () => {
    const matches: Omit<Match, 'id' | 'finishedAt'>[] = [
      {
        teamHomeId: 'mexico',
        teamAwayId: 'canada',
        teamHomeScore: 0,
        teamAwayScore: 5,
        startedAt: new Date('2024-01-01T12:00:00Z'),
      },
      {
        teamHomeId: 'spain',
        teamAwayId: 'brazil',
        teamHomeScore: 10,
        teamAwayScore: 2,
        startedAt: new Date('2024-01-01T13:00:00Z'),
      },
      {
        teamHomeId: 'germany',
        teamAwayId: 'france',
        teamHomeScore: 2,
        teamAwayScore: 2,
        startedAt: new Date('2024-01-01T14:00:00Z'),
      },
      {
        teamHomeId: 'uruguay',
        teamAwayId: 'italy',
        teamHomeScore: 6,
        teamAwayScore: 6,
        startedAt: new Date('2024-01-01T15:00:00Z'),
      },
      {
        teamHomeId: 'argentina',
        teamAwayId: 'australia',
        teamHomeScore: 3,
        teamAwayScore: 1,
        startedAt: new Date('2024-01-01T16:00:00Z'),
      },
    ];

    const sortedMatches = ScoreboardService.sortMatches(matches as Match[]);
    const expectedMatches = [
      {
        teamHomeId: 'uruguay',
        teamAwayId: 'italy',
        teamHomeScore: 6,
        teamAwayScore: 6,
      },
      {
        teamHomeId: 'spain',
        teamAwayId: 'brazil',
        teamHomeScore: 10,
        teamAwayScore: 2,
      },
      {
        teamHomeId: 'mexico',
        teamAwayId: 'canada',
        teamHomeScore: 0,
        teamAwayScore: 5,
      },
      {
        teamHomeId: 'argentina',
        teamAwayId: 'australia',
        teamHomeScore: 3,
        teamAwayScore: 1,
      },
      {
        teamHomeId: 'germany',
        teamAwayId: 'france',
        teamHomeScore: 2,
        teamAwayScore: 2,
      },
    ];

    expect(sortedMatches).toMatchObject(expectedMatches);
  });
});
