import { Injectable } from '@nestjs/common';
import { MatchRepository } from './match.repository';

@Injectable()
export class UpdateScoreService {
  constructor(private readonly matchRepository: MatchRepository) {}

  // eslint-disable-next-line unused-imports/no-unused-vars
  update(matchId: string, teamHomeScore: number, teamAwayScore: number) {
    const match = this.matchRepository.findById(matchId);
    if (!match) {
      throw new Error('Match not found');
    }
  }
}
