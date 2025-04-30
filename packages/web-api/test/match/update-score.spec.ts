import { Test } from '@nestjs/testing';
import { CreateMatchService } from '../../src/match/create-match.service';
import { MatchModule } from '../../src/match/match.module';
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
  return {
    app,
    teamService,
    createMatchService,
    updateScoreService,
  };
}

describe('update score', () => {
  test('invalid match id throws error', async () => {
    const { app, updateScoreService } = await setup();
    try {
      updateScoreService.update('invalid', 1, 2);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      assert(error instanceof Error);
      expect(error.message).toBe('Match not found');
    } finally {
      await app.close();
    }
  });
});
