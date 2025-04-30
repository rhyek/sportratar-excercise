import { Injectable } from '@nestjs/common';
import type { Team } from './team.model';
import { TeamRepository } from './team.repository';

@Injectable()
export class TeamService {
  constructor(private readonly teamRepository: TeamRepository) {}

  findOrCreate(name: string): Team {
    const team = this.teamRepository.findByName(name);
    if (team) {
      return team;
    }
    return this.teamRepository.create(name);
  }
}
