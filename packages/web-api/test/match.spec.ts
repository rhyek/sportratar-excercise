import { faker } from '@faker-js/faker';
import { Test } from '@nestjs/testing';
import { MatchModule } from '../src/match/match.module';
import { MatchService } from '../src/match/match.service';
import { TeamModule } from '../src/team/team.module';
import { TeamService } from '../src/team/team.service';

async function setup() {
  const testingModule = await Test.createTestingModule({
    imports: [MatchModule, TeamModule],
  }).compile();
  const app = testingModule.createNestApplication();
  await app.init();
  const matchService = app.get(MatchService);
  const teamService = app.get(TeamService);
  return {
    app,
    matchService,
    teamService,
  };
}

describe('match', () => {
  test('create', async () => {
    const { app, matchService, teamService } = await setup();
    try {
      const teamHomeName = faker.word.noun();
      const teamAwayName = faker.word.noun();
      const teamHome = teamService.findOrCreate(teamHomeName);
      const teamAway = teamService.findOrCreate(teamAwayName);
      const match = matchService.create(teamHome.id, teamAway.id);
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
  test('create with invalid team', async () => {
    const { app, matchService } = await setup();
    try {
      matchService.create('invalid', 'invalid');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      assert(error instanceof Error);
      expect(error.message).toBe('Team not found');
    } finally {
      await app.close();
    }
  });
});
