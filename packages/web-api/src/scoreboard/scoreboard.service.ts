import { Injectable } from '@nestjs/common';
import type { Match } from '../match/match.model';
import { MatchService } from '../match/match.service';
import { TeamRepository } from '../team/team.repository';
import type { Scoreboard } from './scoreboard.model';

@Injectable()
export class ScoreboardService {
  constructor(
    private readonly matchService: MatchService,
    private readonly teamRepository: TeamRepository,
  ) {}

  getScoreboard(): Scoreboard {
    const unsortedMatches = this.matchService.getOngoingMatches();
    const sortedMatches = ScoreboardService.sortMatches(unsortedMatches);
    const result = sortedMatches.map((match) => ({
      id: match.id,
      homeTeam: {
        id: match.teamHomeId,
        name: this.teamRepository.findById(match.teamHomeId)!.name,
        score: match.teamHomeScore,
      },
      awayTeam: {
        id: match.teamAwayId,
        name: this.teamRepository.findById(match.teamAwayId)!.name,
        score: match.teamAwayScore,
      },
      startedAt: match.startedAt,
    }));
    return { matches: result };
  }

  static sortMatches(matches: Match[]) {
    return matches.sort((a, b) => {
      const scoreDiff =
        b.teamHomeScore + b.teamAwayScore - (a.teamHomeScore + a.teamAwayScore);
      if (scoreDiff !== 0) {
        return scoreDiff;
      }
      return b.startedAt.getTime() - a.startedAt.getTime();
    });
  }
}
