import { Injectable } from '@nestjs/common';
import { ulid } from 'ulid';
import { LibraryError } from '../library-error';
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
      homeTeamId: params.teamHome.id,
      awayTeamId: params.teamAway.id,
      homeTeamScore: params.teamHome.score,
      awayTeamScore: params.teamAway.score,
      startedAt: new Date(),
      endedAt: null,
    };
    this.matches.push(match);
    return match;
  }

  getOngoingMatches(): Match[] {
    return this.matches.filter((match) => match.endedAt === null);
  }

  findById(id: string): Match | null {
    return this.matches.find((match) => match.id === id) ?? null;
  }

  update(
    id: string,
    match: Partial<Pick<Match, 'homeTeamScore' | 'awayTeamScore' | 'endedAt'>>,
  ) {
    const matchIndex = this.matches.findIndex((match) => match.id === id);
    if (matchIndex === -1) {
      throw new LibraryError('Match not found');
    }
    this.matches[matchIndex] = { ...this.matches[matchIndex], ...match };
  }
}
