import { Test, type TestingModule } from '@nestjs/testing';
import {
  LibraryModule,
  MatchService,
  ScoreboardService,
  TeamService,
} from '../src';

describe('library', () => {
  test('basic functionality', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LibraryModule],
    }).compile();
    const app = module.createNestApplication();
    await app.init();

    const teamService = app.get(TeamService);
    const matchService = app.get(MatchService);
    const scoreboardService = app.get(ScoreboardService);

    const team1 = teamService.findOrCreate('team1');
    const team2 = teamService.findOrCreate('team2');
    const match = matchService.create(team1.id, team2.id);
    matchService.updateScore(match.id, 1, 2);
    const scoreboard = scoreboardService.getScoreboard();
    expect(scoreboard).toEqual({
      matches: [
        {
          id: match.id,
          homeTeam: {
            id: team1.id,
            name: team1.name,
            score: 1,
          },
          awayTeam: {
            id: team2.id,
            name: team2.name,
            score: 2,
          },
          totalScore: 3,
          startedAt: expect.any(Date),
        },
      ],
    });
  });
});
