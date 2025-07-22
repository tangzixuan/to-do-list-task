import { Team } from './team.entity';
import { User } from './user.entity';
export declare enum TeamRole {
    OWNER = "owner",
    ADMIN = "admin",
    MEMBER = "member"
}
export declare class TeamMember {
    id: string;
    teamId: string;
    userId: string;
    role: TeamRole;
    joinedAt: Date;
    team: Team;
    user: User;
}
