import { Injectable } from '@nestjs/common';
import { ulid } from 'ulid';
import type { Team } from './team.model';

@Injectable()
export class TeamRepository {
  private readonly teams: Team[] = [];
  private readonly teamNameIndex: Map<string, Team> = new Map();

  create(name: string): Team {
    if (this.teamNameIndex.has(name)) {
      throw new Error('Team already exists');
    }
    const newTeam = {
      id: ulid(),
      name,
    };
    this.teams.push(newTeam);
    this.teamNameIndex.set(name, newTeam);
    return newTeam;
  }

  findByName(name: string): Team | null {
    return this.teamNameIndex.get(name) ?? null;
  }

  findOrCreate(name: string): Team {
    const team = this.findByName(name);
    if (team) {
      return team;
    }
    return this.create(name);
  }
}
