import { ulid } from 'ulid';
import { CreateMatchService } from './create-match.service';
import type { Match } from './match.model';

describe('checkTeamsInOngoingMatches', () => {
  test('no ongoing matches', () => {
    const ongoingMatches: Match[] = [];
    const teamIds = ['team1', 'team2'];
    expect(() =>
      CreateMatchService.checkTeamsInOngoingMatches(teamIds, ongoingMatches),
    ).not.toThrow();
  });
  test('some ongoing matches, but no team in ongoing matches', () => {
    const ongoingMatches: Match[] = [
      {
        id: ulid(),
        teamHomeId: 'team3',
        teamAwayId: 'team4',
        teamHomeScore: 3,
        teamAwayScore: 1,
        startedAt: new Date(),
        finishedAt: null,
      },
      {
        id: ulid(),
        teamHomeId: 'team5',
        teamAwayId: 'team6',
        teamHomeScore: 4,
        teamAwayScore: 2,
        startedAt: new Date(),
        finishedAt: null,
      },
    ];
    const teamIds = ['team1', 'team2'];
    expect(() =>
      CreateMatchService.checkTeamsInOngoingMatches(teamIds, ongoingMatches),
    ).not.toThrow();
  });
  test('some ongoing matches, home team in ongoing matches', () => {
    const matchId = ulid();
    const ongoingMatches: Match[] = [
      {
        id: ulid(),
        teamHomeId: 'team3',
        teamAwayId: 'team4',
        teamHomeScore: 3,
        teamAwayScore: 1,
        startedAt: new Date(),
        finishedAt: null,
      },
      {
        id: matchId,
        teamHomeId: 'team3',
        teamAwayId: 'team1',
        teamHomeScore: 4,
        teamAwayScore: 2,
        startedAt: new Date(),
        finishedAt: null,
      },
    ];
    const teamIds = ['team1', 'team2'];
    expect(() =>
      CreateMatchService.checkTeamsInOngoingMatches(teamIds, ongoingMatches),
    ).toThrow(`Team [team1] is already in match [${matchId}]`);
  });
  test('some ongoing matches, away team in ongoing matches', () => {
    const matchId = ulid();
    const ongoingMatches: Match[] = [
      {
        id: ulid(),
        teamHomeId: 'team3',
        teamAwayId: 'team4',
        teamHomeScore: 3,
        teamAwayScore: 1,
        startedAt: new Date(),
        finishedAt: null,
      },
      {
        id: matchId,
        teamHomeId: 'team2',
        teamAwayId: 'team4',
        teamHomeScore: 4,
        teamAwayScore: 2,
        startedAt: new Date(),
        finishedAt: null,
      },
    ];
    const teamIds = ['team1', 'team2'];
    expect(() =>
      CreateMatchService.checkTeamsInOngoingMatches(teamIds, ongoingMatches),
    ).toThrow(`Team [team2] is already in match [${matchId}]`);
  });
});
