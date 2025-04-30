import { Module } from '@nestjs/common';
import { TeamModule } from '../team/team.module';
import { CreateMatchService } from './create-match.service';
import { MatchRepository } from './match.repository';
import { MatchService } from './match.service';
import { UpdateScoreService } from './update-score.service';

@Module({
  imports: [TeamModule],
  providers: [
    MatchService,
    MatchRepository,
    CreateMatchService,
    UpdateScoreService,
  ],
  exports: [MatchService, CreateMatchService, UpdateScoreService],
})
export class MatchModule {}
