import { Module } from '@nestjs/common';
import { TeamRepository } from './team.repository';
import { TeamService } from './team.service';

@Module({
  providers: [TeamRepository, TeamService],
  exports: [TeamRepository, TeamService],
})
export class TeamModule {}
