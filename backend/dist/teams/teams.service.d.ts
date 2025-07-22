import { Repository } from 'typeorm';
import { Team } from '../entities/team.entity';
import { TeamMember } from '../entities/team-member.entity';
export declare class TeamsService {
    private teamRepository;
    private teamMemberRepository;
    constructor(teamRepository: Repository<Team>, teamMemberRepository: Repository<TeamMember>);
    findUserTeams(userId: string): Promise<Team[]>;
}
