import { Injectable } from '@nestjs/common';
import { ulid } from 'ulid';
import type { Team } from './team.model';

@Injectable()
export class TeamRepository {
  private readonly teams: Team[] = [];
  private readonly teamIdIndex = new Map<string, Team>();

  create(name: string): Team {
    if (this.teams.find((team) => team.name === name)) {
      throw new Error('Team already exists');
    }
    const newTeam = {
      id: ulid(),
      name,
    };
    this.teams.push(newTeam);
    this.teamIdIndex.set(newTeam.id, newTeam);
    return newTeam;
  }

  findById(id: string): Team | null {
    return this.teamIdIndex.get(id) ?? null;
  }

  findByName(name: string): Team | null {
    return this.teams.find((team) => team.name === name) ?? null;
  }
}
