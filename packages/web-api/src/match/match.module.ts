import { Module } from '@nestjs/common';
import { TeamModule } from '../team/team.module';
import { MatchRepository } from './match.repository';
import { MatchService } from './match.service';

@Module({
  imports: [TeamModule],
  providers: [MatchService, MatchRepository],
})
export class MatchModule {}
