import { Module } from '@nestjs/common';
import { MatchModule } from '../match/match.module';
import { ScoreboardService } from './scoreboard.service';

@Module({
  imports: [MatchModule],
  providers: [ScoreboardService],
  exports: [ScoreboardService],
})
export class ScoreboardModule {}
