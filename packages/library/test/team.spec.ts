import { Test } from '@nestjs/testing';
import { TeamModule } from '../src/team/team.module';
import { TeamRepository } from '../src/team/team.repository';
import { TeamService } from '../src/team/team.service';

async function setup() {
  const testingModule = await Test.createTestingModule({
    imports: [TeamModule],
  }).compile();
  const app = testingModule.createNestApplication();
  await app.init();
  const teamRepository = app.get(TeamRepository);
  const teamService = app.get(TeamService);
  return {
    app,
    teamRepository,
    teamService,
  };
}

describe('team', () => {
  test('not-existant team returns null', async () => {
    const { app, teamRepository } = await setup();
    try {
      const team = teamRepository.findByName('not-existant');
      expect(team).toBeNull();
    } finally {
      await app.close();
    }
  });
  test('create team', async () => {
    const { app, teamRepository } = await setup();
    try {
      const teamName = 'test1';
      let team = teamRepository.findByName(teamName);
      expect(team).toBeNull();
      team = teamRepository.create(teamName);
      expect(team).not.toBeNull();
      expect(team).toMatchObject({
        id: expect.any(String),
        name: teamName,
      });
    } finally {
      await app.close();
    }
  });
  test('create team with same name throws', async () => {
    const { app, teamRepository } = await setup();
    try {
      const teamName = 'test1';
      teamRepository.create(teamName);
      expect(() => teamRepository.create(teamName)).toThrow();
    } finally {
      await app.close();
    }
  });
  test('findOrCreate', async () => {
    const { app, teamService } = await setup();
    try {
      const teamName = 'test1';
      let team = teamService.findOrCreate(teamName);
      expect(team).not.toBeNull();
      expect(team).toMatchObject({
        id: expect.any(String),
        name: teamName,
      });
      team = teamService.findOrCreate(teamName);
      expect(team).not.toBeNull();
      expect(team).toMatchObject({
        id: expect.any(String),
        name: teamName,
      });
    } finally {
      await app.close();
    }
  });
});
