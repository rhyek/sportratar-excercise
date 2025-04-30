import { Test, TestingModule } from '@nestjs/testing';
import { CreateMatchService } from '../src/match/create-match.service';
import { EndMatchService } from '../src/match/end-match.service';
import { MatchModule } from '../src/match/match.module';
import { UpdateScoreService } from '../src/match/update-score.service';
import { ScoreboardModule } from '../src/scoreboard/scoreboard.module';
import { ScoreboardService } from '../src/scoreboard/scoreboard.service';
import { TeamModule } from '../src/team/team.module';
import { TeamService } from '../src/team/team.service';

async function setup() {
  const module: TestingModule = await Test.createTestingModule({
    imports: [MatchModule, TeamModule, ScoreboardModule],
  }).compile();

  const app = module.createNestApplication();
  await app.init();
  const teamService = app.get(TeamService);
  const createMatchService = app.get(CreateMatchService);
  const updateScoreService = app.get(UpdateScoreService);
  const endMatchService = app.get(EndMatchService);
  const scoreboardService = app.get(ScoreboardService);
  return {
    app,
    teamService,
    createMatchService,
    updateScoreService,
    endMatchService,
    scoreboardService,
  };
}

describe('scoreboard', () => {
  test('should return the scoreboard', async () => {
    const {
      app,
      teamService,
      createMatchService,
      updateScoreService,
      endMatchService,
      scoreboardService,
    } = await setup();
    try {
      {
        const teamHome = teamService.findOrCreate('team1');
        const teamAway = teamService.findOrCreate('team2');
        const match = createMatchService.create(teamHome.id, teamAway.id);
        updateScoreService.update(match.id, 3, 4);
      }
      {
        await new Promise((resolve) => setTimeout(resolve, 100));
        const teamHome = teamService.findOrCreate('team3');
        const teamAway = teamService.findOrCreate('team4');
        const match = createMatchService.create(teamHome.id, teamAway.id);
        updateScoreService.update(match.id, 2, 2);
        updateScoreService.update(match.id, 3, 2);
      }
      {
        await new Promise((resolve) => setTimeout(resolve, 100));
        const teamHome = teamService.findOrCreate('team5');
        const teamAway = teamService.findOrCreate('team6');
        const match = createMatchService.create(teamHome.id, teamAway.id);
        updateScoreService.update(match.id, 1, 5);
        endMatchService.end(match.id);
      }
      {
        await new Promise((resolve) => setTimeout(resolve, 100));
        const teamHome = teamService.findOrCreate('team7');
        const teamAway = teamService.findOrCreate('team8');
        const match = createMatchService.create(teamHome.id, teamAway.id);
        updateScoreService.update(match.id, 2, 5);
      }
      const expectedScoreboard = {
        matches: [
          {
            id: expect.any(String),
            homeTeam: {
              id: expect.any(String),
              name: 'team7',
              score: 2,
            },
            awayTeam: {
              id: expect.any(String),
              name: 'team8',
              score: 5,
            },
            startedAt: expect.any(Date),
          },
          {
            id: expect.any(String),
            homeTeam: {
              id: expect.any(String),
              name: 'team1',
              score: 3,
            },
            awayTeam: {
              id: expect.any(String),
              name: 'team2',
              score: 4,
            },
            startedAt: expect.any(Date),
          },
          {
            id: expect.any(String),
            homeTeam: {
              id: expect.any(String),
              name: 'team3',
              score: 3,
            },
            awayTeam: {
              id: expect.any(String),
              name: 'team4',
              score: 2,
            },
            startedAt: expect.any(Date),
          },
        ],
      };
      const result = scoreboardService.getScoreboard();
      expect(result).toEqual(expectedScoreboard);
    } finally {
      await app.close();
    }
  });
});
