import { Injectable } from '@nestjs/common';
import type { TeamRepository } from '../team/team.repository';

@Injectable()
export class MatchService {
  constructor(private readonly teamRepository: TeamRepository) {}

  create(teamHomeName: string, teamAwayName: string) {
    const teamHome = this.teamRepository.findOrCreate(teamHomeName);
    const teamAway = this.teamRepository.findOrCreate(teamAwayName);
  }
}
