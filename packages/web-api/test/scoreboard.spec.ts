import { Test, TestingModule } from '@nestjs/testing';
import { MatchModule } from '../src/match/match.module';
import { ScoreboardModule } from '../src/scoreboard/scoreboard.module';
import { TeamModule } from '../src/team/team.module';

async function setup() {
  const module: TestingModule = await Test.createTestingModule({
    imports: [MatchModule, TeamModule, ScoreboardModule],
  }).compile();

  const app = module.createNestApplication();
  await app.init();

  return { app };
}

describe('scoreboard', () => {
  test('should return the scoreboard', async () => {
    const { app } = await setup();
    try {
      //
    } finally {
      await app.close();
    }
  });
});
