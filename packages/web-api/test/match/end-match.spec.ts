import { Test } from '@nestjs/testing';
import { EndMatchService } from '../../src/match/end-match.service';
import { MatchModule } from '../../src/match/match.module';
import { TeamModule } from '../../src/team/team.module';

async function setup() {
  const testingModule = await Test.createTestingModule({
    imports: [MatchModule, TeamModule],
  }).compile();
  const app = testingModule.createNestApplication();
  await app.init();
  const endMatchService = app.get(EndMatchService);
  return {
    app,
    endMatchService,
  };
}

describe('end match', () => {
  test('end match with invalid team throws', async () => {
    const { app, endMatchService } = await setup();
    try {
      expect(() => endMatchService.end('invalid')).toThrow('Match not found');
    } finally {
      await app.close();
    }
  });
});
