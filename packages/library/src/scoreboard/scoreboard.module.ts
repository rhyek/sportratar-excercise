import { Module } from '@nestjs/common';
import { MatchModule } from '../match/match.module';
import { TeamModule } from '../team/team.module';
import { ScoreboardService } from './scoreboard.service';

@Module({
  imports: [MatchModule, TeamModule],
  providers: [ScoreboardService],
  exports: [ScoreboardService],
})
export class ScoreboardModule {}
