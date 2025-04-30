import { Injectable } from '@nestjs/common';
import { CreateMatchService } from './create-match.service';
import { UpdateScoreService } from './update-score.service';

@Injectable()
export class MatchService {
  constructor(
    private readonly createMatchService: CreateMatchService,
    private readonly updateScoreService: UpdateScoreService,
  ) {}

  create(teamHomeId: string, teamAwayId: string) {
    return this.createMatchService.create(teamHomeId, teamAwayId);
  }

  updateScore(matchId: string, teamHomeScore: number, teamAwayScore: number) {
    this.updateScoreService.update(matchId, teamHomeScore, teamAwayScore);
  }
}
