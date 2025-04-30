import { Injectable } from '@nestjs/common';
import { TeamRepository } from '../team/team.repository';
import type { Match } from './match.model';
import { MatchRepository } from './match.repository';

@Injectable()
export class CreateMatchService {
  constructor(
    private readonly teamRepository: TeamRepository,
    private readonly matchRepository: MatchRepository,
  ) {}

  create(homeTeamId: string, awayTeamId: string) {
    if (homeTeamId === awayTeamId) {
      throw new Error('Home and away team cannot be the same');
    }
    const teamIds = [homeTeamId, awayTeamId];
    for (const teamId of teamIds) {
      if (!this.teamRepository.findById(teamId)) {
        throw new Error(`Team [${teamId}] not found`);
      }
    }
    CreateMatchService.checkTeamsInOngoingMatches(
      teamIds,
      this.matchRepository.getOngoingMatches(),
    );
    return this.matchRepository.create({
      teamHome: {
        id: homeTeamId,
        score: 0,
      },
      teamAway: {
        id: awayTeamId,
        score: 0,
      },
    });
  }

  static checkTeamsInOngoingMatches(
    teamIds: string[],
    ongoingMatches: Match[],
  ) {
    for (const match of ongoingMatches) {
      const matchTeamIds = [match.homeTeamId, match.awayTeamId];
      for (const teamId of teamIds) {
        if (matchTeamIds.includes(teamId)) {
          throw new Error(`Team [${teamId}] is already in match [${match.id}]`);
        }
      }
    }
  }
}
