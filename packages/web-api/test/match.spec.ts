import { faker } from '@faker-js/faker';
import { Test } from '@nestjs/testing';
import { MatchModule } from '../src/match/match.module';
import { MatchService } from '../src/match/match.service';

async function setup() {
  const testingModule = await Test.createTestingModule({
    imports: [MatchModule],
  }).compile();
  const app = testingModule.createNestApplication();
  await app.init();
  const matchService = app.get(MatchService);
  return {
    app,
    matchService,
  };
}

describe('match', () => {
  test('create', async () => {
    const { app, matchService } = await setup();
    try {
      const teamHomeName = faker.word.noun();
      const teamAwayName = faker.word.noun();
      const match = matchService.create(teamHomeName, teamAwayName);
      expect(match).not.toBeNull();
      expect(match).toMatchObject({
        id: expect.any(String),
        teamHomeId: expect.any(String),
        teamAwayId: expect.any(String),
        teamHomeScore: 0,
        teamAwayScore: 0,
        startedAt: expect.any(Date),
        finishedAt: null,
      });
    } finally {
      await app.close();
    }
  });
});
