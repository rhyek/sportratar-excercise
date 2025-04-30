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

  getOngoingMatches(): Match[] {
    return this.matches.filter((match) => match.finishedAt === null);
  }

  findById(id: string): Match | null {
    return this.matches.find((match) => match.id === id) ?? null;
  }

  update(
    id: string,
    match: Partial<
      Pick<Match, 'teamHomeScore' | 'teamAwayScore' | 'finishedAt'>
    >,
  ) {
    const matchIndex = this.matches.findIndex((match) => match.id === id);
    if (matchIndex === -1) {
      throw new Error('Match not found');
    }
    this.matches[matchIndex] = { ...this.matches[matchIndex], ...match };
  }
}
