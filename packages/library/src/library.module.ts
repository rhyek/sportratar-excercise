import { Module } from '@nestjs/common';
import { MatchModule } from './match/match.module';
import { ScoreboardModule } from './scoreboard/scoreboard.module';
import { TeamModule } from './team/team.module';

@Module({
  imports: [TeamModule, MatchModule, ScoreboardModule],
  exports: [TeamModule, MatchModule, ScoreboardModule],
})
export class LibraryModule {}
