import { Injectable } from '@nestjs/common';
import { TeamRepository } from '../team/team.repository';
import type { Match } from './match.model';
import { MatchRepository } from './match.repository';

@Injectable()
export class MatchService {
  constructor(
    private readonly teamRepository: TeamRepository,
    private readonly matchRepository: MatchRepository,
  ) {}

  create(teamHomeId: string, teamAwayId: string) {
    if (
      !this.teamRepository.findById(teamHomeId) ||
      !this.teamRepository.findById(teamAwayId)
    ) {
      throw new Error('Team not found');
    }
    MatchService.checkTeamsInOngoingMatches(
      [teamHomeId, teamAwayId],
      this.matchRepository.getOngoingMatches(),
    );
    return this.matchRepository.create({
      teamHome: {
        id: teamHomeId,
        score: 0,
      },
      teamAway: {
        id: teamAwayId,
        score: 0,
      },
    });
  }

  static checkTeamsInOngoingMatches(
    teamIds: string[],
    ongoingMatches: Match[],
  ) {
    for (const match of ongoingMatches) {
      const matchTeamIds = [match.teamHomeId, match.teamAwayId];
      for (const teamId of teamIds) {
        if (matchTeamIds.includes(teamId)) {
          throw new Error(`Team [${teamId}] is already in match [${match.id}]`);
        }
      }
    }
  }
}
