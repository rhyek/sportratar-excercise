import { Injectable } from '@nestjs/common';
import { CreateMatchService } from './create-match.service';

@Injectable()
export class MatchService {
  constructor(private readonly createMatchService: CreateMatchService) {}

  create(teamHomeId: string, teamAwayId: string) {
    return this.createMatchService.create(teamHomeId, teamAwayId);
  }
}
