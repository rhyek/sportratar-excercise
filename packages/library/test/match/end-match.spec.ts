import { Test } from '@nestjs/testing';
import { CreateMatchService } from '../../src/match/create-match.service';
import { EndMatchService } from '../../src/match/end-match.service';
import { MatchModule } from '../../src/match/match.module';
import { MatchRepository } from '../../src/match/match.repository';
import { TeamModule } from '../../src/team/team.module';
import { TeamService } from '../../src/team/team.service';

async function setup() {
  const testingModule = await Test.createTestingModule({
    imports: [MatchModule, TeamModule],
  }).compile();
  const app = testingModule.createNestApplication();
  await app.init();
  const endMatchService = app.get(EndMatchService);
  const createMatchService = app.get(CreateMatchService);
  const teamService = app.get(TeamService);
  const matchRepository = app.get(MatchRepository);
  return {
    app,
    endMatchService,
    createMatchService,
    teamService,
    matchRepository,
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
  test('can end match', async () => {
    const { app, endMatchService, createMatchService, teamService } =
      await setup();
    try {
      const teamHome = teamService.findOrCreate('team1');
      const teamAway = teamService.findOrCreate('team2');
      const { id } = createMatchService.create(teamHome.id, teamAway.id);
      endMatchService.end(id);
    } finally {
      await app.close();
    }
  });
  test('ended match is not included in ongoing matches', async () => {
    const {
      app,
      endMatchService,
      createMatchService,
      teamService,
      matchRepository,
    } = await setup();
    try {
      const teamHome = teamService.findOrCreate('team1');
      const teamAway = teamService.findOrCreate('team2');
      const { id } = createMatchService.create(teamHome.id, teamAway.id);
      let ongoingMatches = matchRepository.getOngoingMatches();
      expect(
        ongoingMatches.find((match) => match.id === id) ?? null,
      ).not.toBeNull();
      endMatchService.end(id);
      ongoingMatches = matchRepository.getOngoingMatches();
      expect(
        ongoingMatches.find((match) => match.id === id) ?? null,
      ).toBeNull();
    } finally {
      await app.close();
    }
  });
  test('ending already ended match throws', async () => {
    const { app, endMatchService, createMatchService, teamService } =
      await setup();
    try {
      const teamHome = teamService.findOrCreate('team1');
      const teamAway = teamService.findOrCreate('team2');
      const { id } = createMatchService.create(teamHome.id, teamAway.id);
      endMatchService.end(id);
      expect(() => endMatchService.end(id)).toThrow('Match already finished');
    } finally {
      await app.close();
    }
  });
});
