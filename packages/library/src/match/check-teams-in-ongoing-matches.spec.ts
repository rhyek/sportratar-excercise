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
        homeTeamId: 'team3',
        awayTeamId: 'team4',
        homeTeamScore: 3,
        awayTeamScore: 1,
        startedAt: new Date(),
        finishedAt: null,
      },
      {
        id: ulid(),
        homeTeamId: 'team5',
        awayTeamId: 'team6',
        homeTeamScore: 4,
        awayTeamScore: 2,
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
        homeTeamId: 'team3',
        awayTeamId: 'team4',
        homeTeamScore: 3,
        awayTeamScore: 1,
        startedAt: new Date(),
        finishedAt: null,
      },
      {
        id: matchId,
        homeTeamId: 'team3',
        awayTeamId: 'team1',
        homeTeamScore: 4,
        awayTeamScore: 2,
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
        homeTeamId: 'team3',
        awayTeamId: 'team4',
        homeTeamScore: 3,
        awayTeamScore: 1,
        startedAt: new Date(),
        finishedAt: null,
      },
      {
        id: matchId,
        homeTeamId: 'team2',
        awayTeamId: 'team4',
        homeTeamScore: 4,
        awayTeamScore: 2,
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
