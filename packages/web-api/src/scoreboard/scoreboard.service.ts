import { Injectable } from '@nestjs/common';
import type { Match } from '../match/match.model';
import { MatchService } from '../match/match.service';

@Injectable()
export class ScoreboardService {
  constructor(private readonly matchService: MatchService) {}

  getScoreboard(): Match[] {
    return this.matchService.getOngoingMatches();
  }
}
