import { faker } from '@faker-js/faker';
import { Test } from '@nestjs/testing';
import { CreateMatchService } from '../../src/match/create-match.service';
import { MatchModule } from '../../src/match/match.module';
import { TeamModule } from '../../src/team/team.module';
import { TeamService } from '../../src/team/team.service';

async function setup() {
  const testingModule = await Test.createTestingModule({
    imports: [MatchModule, TeamModule],
  }).compile();
  const app = testingModule.createNestApplication();
  await app.init();
  const createMatchService = app.get(CreateMatchService);
  const teamService = app.get(TeamService);
  return {
    app,
    createMatchService,
    teamService,
  };
}

describe('create match', () => {
  test('create with invalid team throws', async () => {
    const { app, createMatchService } = await setup();
    try {
      expect(() => createMatchService.create('invalid1', 'invalid2')).toThrow(
        'Team [invalid1] not found',
      );
    } finally {
      await app.close();
    }
  });
  test('can create', async () => {
    const { app, createMatchService, teamService } = await setup();
    try {
      const teamHomeName = faker.word.noun();
      const teamAwayName = faker.word.noun();
      const teamHome = teamService.findOrCreate(teamHomeName);
      const teamAway = teamService.findOrCreate(teamAwayName);
      const match = createMatchService.create(teamHome.id, teamAway.id);
      expect(match).not.toBeNull();
      expect(match).toMatchObject({
        id: expect.any(String),
        homeTeamId: expect.any(String),
        awayTeamId: expect.any(String),
        homeTeamScore: 0,
        awayTeamScore: 0,
        startedAt: expect.any(Date),
        finishedAt: null,
      });
    } finally {
      await app.close();
    }
  });
  test('create with same team throws', async () => {
    const { app, createMatchService, teamService } = await setup();
    try {
      const team = teamService.findOrCreate('team1');
      expect(() => createMatchService.create(team.id, team.id)).toThrow(
        'Home and away team cannot be the same',
      );
    } finally {
      await app.close();
    }
  });
  test('cannot create with team in ongoing match', async () => {
    const { app, createMatchService, teamService } = await setup();
    try {
      const team1 = teamService.findOrCreate('team1');
      const team2 = teamService.findOrCreate('team2');
      const team3 = teamService.findOrCreate('team3');
      const match1 = createMatchService.create(team1.id, team2.id);
      expect(() => createMatchService.create(team3.id, team2.id)).toThrow(
        `Team [${team2.id}] is already in match [${match1.id}]`,
      );
    } finally {
      await app.close();
    }
  });
});
