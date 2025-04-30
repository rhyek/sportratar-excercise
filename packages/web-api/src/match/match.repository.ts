import { Injectable } from '@nestjs/common';
import { ulid } from 'ulid';
import type { Match } from './match.model';

@Injectable()
export class MatchRepository {
  private matches: Match[] = [];

  create(params: {
    teamHome: {
      id: string;
      score: number;
    };
    teamAway: {
      id: string;
      score: number;
    };
  }): Match {
    const match: Match = {
      id: ulid(),
      teamHomeId: params.teamHome.id,
      teamAwayId: params.teamAway.id,
      teamHomeScore: params.teamHome.score,
      teamAwayScore: params.teamAway.score,
      startedAt: new Date(),
      finishedAt: null,
    };
    this.matches.push(match);
    return match;
  }
}
