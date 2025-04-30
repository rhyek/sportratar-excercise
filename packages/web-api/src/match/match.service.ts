import { Injectable } from '@nestjs/common';
import { TeamRepository } from '../team/team.repository';
import { MatchRepository } from './match.repository';

@Injectable()
export class MatchService {
  constructor(
    private readonly teamRepository: TeamRepository,
    private readonly matchRepository: MatchRepository,
  ) {}

  create(teamHomeName: string, teamAwayName: string) {
    const teamHome = this.teamRepository.findOrCreate(teamHomeName);
    const teamAway = this.teamRepository.findOrCreate(teamAwayName);
    return this.matchRepository.create({
      teamHome: {
        id: teamHome.id,
        score: 0,
      },
      teamAway: {
        id: teamAway.id,
        score: 0,
      },
    });
  }
}
