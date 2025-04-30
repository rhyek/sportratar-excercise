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
    const sortedMatches = ScoreboardService.sortByTotalScore(unsortedMatches);
    const result = sortedMatches.map((match) => ({
      id: match.id,
      homeTeam: {
        id: match.homeTeamId,
        name: this.teamRepository.findById(match.homeTeamId)!.name,
        score: match.homeTeamScore,
      },
      awayTeam: {
        id: match.awayTeamId,
        name: this.teamRepository.findById(match.awayTeamId)!.name,
        score: match.awayTeamScore,
      },
      startedAt: match.startedAt,
      totalScore: match.totalScore,
    }));
    return { matches: result };
  }

  static sortByTotalScore(matches: Match[]) {
    return matches
      .map((m) => ({
        ...m,
        totalScore: m.homeTeamScore + m.awayTeamScore,
      }))
      .sort((a, b) => {
        const scoreDiff = b.totalScore - a.totalScore;
        if (scoreDiff !== 0) {
          return scoreDiff;
        }
        return b.startedAt.getTime() - a.startedAt.getTime();
      });
  }
}
