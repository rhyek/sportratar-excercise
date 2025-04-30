import { Test } from '@nestjs/testing';
import { LibraryError } from '../../src/library-error';
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
      createMatchService.create('invalid1', 'invalid2');
    } catch (error) {
      assert(error instanceof LibraryError);
      expect(error.message).toBe('Team [invalid1] not found');
    } finally {
      await app.close();
    }
  });
  test('can create', async () => {
    const { app, createMatchService, teamService } = await setup();
    try {
      const teamHome = teamService.findOrCreate('team1');
      const teamAway = teamService.findOrCreate('team2');
      const match = createMatchService.create(teamHome.id, teamAway.id);
      expect(match).not.toBeNull();
      expect(match).toMatchObject({
        id: expect.any(String),
        homeTeamId: expect.any(String),
        awayTeamId: expect.any(String),
        homeTeamScore: 0,
        awayTeamScore: 0,
        startedAt: expect.any(Date),
        endedAt: null,
      });
    } finally {
      await app.close();
    }
  });
  test('create with same team throws', async () => {
    const { app, createMatchService, teamService } = await setup();
    try {
      const team = teamService.findOrCreate('team1');
      createMatchService.create(team.id, team.id);
    } catch (error) {
      assert(error instanceof LibraryError);
      expect(error.message).toBe('Home and away team cannot be the same');
    } finally {
      await app.close();
    }
  });
  test('cannot create with team in ongoing match', async () => {
    const { app, createMatchService, teamService } = await setup();
    let teamId!: string;
    let matchId!: string;
    try {
      const team1 = teamService.findOrCreate('team1');
      const team2 = teamService.findOrCreate('team2');
      const team3 = teamService.findOrCreate('team3');
      const match1 = createMatchService.create(team1.id, team2.id);
      teamId = team2.id;
      matchId = match1.id;
      createMatchService.create(team3.id, team2.id);
    } catch (error) {
      assert(error instanceof LibraryError);
      expect(error.message).toBe(
        `Team [${teamId}] is already in match [${matchId}]`,
      );
    } finally {
      await app.close();
    }
  });
});
