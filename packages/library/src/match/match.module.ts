import { Module } from '@nestjs/common';
import { TeamModule } from '../team/team.module';
import { CreateMatchService } from './create-match.service';
import { EndMatchService } from './end-match.service';
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
    EndMatchService,
  ],
  exports: [
    MatchService,
    CreateMatchService,
    UpdateScoreService,
    EndMatchService,
  ],
})
export class MatchModule {}
