import { User } from './user.entity';
import { TeamMember } from './team-member.entity';
import { Task } from './task.entity';
export declare class Team {
    id: string;
    name: string;
    description?: string;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
    owner: User;
    members: TeamMember[];
    tasks: Task[];
}
