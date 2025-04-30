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

  create(teamHomeName: string, teamAwayName: string) {
    const teamHome = this.teamRepository.findOrCreate(teamHomeName);
    const teamAway = this.teamRepository.findOrCreate(teamAwayName);
    MatchService.checkTeamsInOngoingMatches(
      [teamHome.id, teamAway.id],
      this.matchRepository.getOngoingMatches(),
    );
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
