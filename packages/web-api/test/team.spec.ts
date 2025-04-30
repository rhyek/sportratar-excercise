import { Test } from '@nestjs/testing';
import { TeamModule } from '../src/team/team.module';
import { TeamRepository } from '../src/team/team.repository';

async function setup() {
  const testingModule = await Test.createTestingModule({
    imports: [TeamModule],
  }).compile();
  const app = testingModule.createNestApplication();
  await app.init();
  const teamRepository = app.get(TeamRepository);
  return {
    app,
    teamRepository,
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
});
