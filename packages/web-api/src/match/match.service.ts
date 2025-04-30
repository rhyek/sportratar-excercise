import { Injectable } from '@nestjs/common';
import { CreateMatchService } from './create-match.service';
import { EndMatchService } from './end-match.service';
import { MatchRepository } from './match.repository';
import { UpdateScoreService } from './update-score.service';

@Injectable()
export class MatchService {
  constructor(
    private readonly createMatchService: CreateMatchService,
    private readonly updateScoreService: UpdateScoreService,
    private readonly endMatchService: EndMatchService,
    private readonly matchRepository: MatchRepository,
  ) {}

  create(teamHomeId: string, teamAwayId: string) {
    return this.createMatchService.create(teamHomeId, teamAwayId);
  }

  updateScore(matchId: string, teamHomeScore: number, teamAwayScore: number) {
    this.updateScoreService.update(matchId, teamHomeScore, teamAwayScore);
  }

  end(matchId: string) {
    this.endMatchService.end(matchId);
  }

  getOngoingMatches() {
    return this.matchRepository.getOngoingMatches();
  }
}
