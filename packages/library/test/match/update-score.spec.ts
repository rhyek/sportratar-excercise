import { Test } from '@nestjs/testing';
import { LibraryError } from '../../src/library-error';
import { CreateMatchService } from '../../src/match/create-match.service';
import { MatchModule } from '../../src/match/match.module';
import { MatchRepository } from '../../src/match/match.repository';
import { UpdateScoreService } from '../../src/match/update-score.service';
import { TeamModule } from '../../src/team/team.module';
import { TeamService } from '../../src/team/team.service';

async function setup() {
  const testingModule = await Test.createTestingModule({
    imports: [MatchModule, TeamModule],
  }).compile();
  const app = testingModule.createNestApplication();
  await app.init();
  const teamService = app.get(TeamService);
  const createMatchService = app.get(CreateMatchService);
  const updateScoreService = app.get(UpdateScoreService);
  const matchRepository = app.get(MatchRepository);
  return {
    app,
    teamService,
    createMatchService,
    updateScoreService,
    matchRepository,
  };
}

describe('update score', () => {
  test('invalid match id throws error', async () => {
    const { app, updateScoreService } = await setup();
    try {
      updateScoreService.update('invalid', 1, 2);
    } catch (error) {
      assert(error instanceof LibraryError);
      expect(error.message).toBe('Match not found');
    } finally {
      await app.close();
    }
  });
  test('negative score throws error', async () => {
    const { app, updateScoreService } = await setup();
    try {
      updateScoreService.update('invalid', -1, -1);
    } catch (error) {
      assert(error instanceof LibraryError);
      expect(error.message).toBe('Score cannot be negative');
    } finally {
      await app.close();
    }
  });
  test('update score', async () => {
    const {
      app,
      teamService,
      createMatchService,
      updateScoreService,
      matchRepository,
    } = await setup();
    try {
      const teamHome = teamService.findOrCreate('team1');
      const teamAway = teamService.findOrCreate('team2');
      const { id } = createMatchService.create(teamHome.id, teamAway.id);
      let match = matchRepository.findById(id);
      assert(match);
      expect(match).toMatchObject({
        homeTeamScore: 0,
        awayTeamScore: 0,
      });
      updateScoreService.update(id, 1, 2);
      match = matchRepository.findById(id);
      assert(match);
      expect(match).toMatchObject({
        homeTeamScore: 1,
        awayTeamScore: 2,
      });
    } finally {
      await app.close();
    }
  });
});
