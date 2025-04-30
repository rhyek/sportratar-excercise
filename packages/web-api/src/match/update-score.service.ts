import { Injectable } from '@nestjs/common';
import { MatchRepository } from './match.repository';

@Injectable()
export class UpdateScoreService {
  constructor(private readonly matchRepository: MatchRepository) {}

  update(matchId: string, teamHomeScore: number, teamAwayScore: number) {
    if (teamHomeScore < 0 || teamAwayScore < 0) {
      throw new Error('Score cannot be negative');
    }
    this.matchRepository.update(matchId, {
      teamHomeScore,
      teamAwayScore,
    });
  }
}
