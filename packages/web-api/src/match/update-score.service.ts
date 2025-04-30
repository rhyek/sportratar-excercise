import { Injectable } from '@nestjs/common';
import { MatchRepository } from './match.repository';

@Injectable()
export class UpdateScoreService {
  constructor(private readonly matchRepository: MatchRepository) {}

  update(matchId: string, homeTeamScore: number, awayTeamScore: number) {
    if (homeTeamScore < 0 || awayTeamScore < 0) {
      throw new Error('Score cannot be negative');
    }
    this.matchRepository.update(matchId, {
      homeTeamScore,
      awayTeamScore,
    });
  }
}
