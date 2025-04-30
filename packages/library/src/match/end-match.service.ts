import { Injectable } from '@nestjs/common';
import { LibraryError } from '../library-error';
import { MatchRepository } from './match.repository';

@Injectable()
export class EndMatchService {
  constructor(private readonly matchRepository: MatchRepository) {}

  end(matchId: string) {
    const match = this.matchRepository.findById(matchId);
    if (!match) {
      throw new LibraryError('Match not found');
    }
    if (match.endedAt) {
      throw new LibraryError('Match already finished');
    }
    this.matchRepository.update(matchId, {
      endedAt: new Date(),
    });
  }
}
