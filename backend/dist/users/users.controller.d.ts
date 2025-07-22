import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): Promise<{
        id: string;
        email: string;
        username: string;
        avatarUrl?: string;
        createdAt: Date;
        updatedAt: Date;
        createdTasks: import("../entities/task.entity").Task[];
        assignedTasks: import("../entities/task.entity").Task[];
        teamMemberships: import("../entities/team-member.entity").TeamMember[];
        comments: import("../entities/task-comment.entity").TaskComment[];
        watchedTasks: import("../entities/task-watcher.entity").TaskWatcher[];
        taskHistories: import("../entities/task-history.entity").TaskHistory[];
        notifications: import("../entities/notification.entity").Notification[];
    }>;
    updateProfile(req: any, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        email: string;
        username: string;
        avatarUrl?: string;
        createdAt: Date;
        updatedAt: Date;
        createdTasks: import("../entities/task.entity").Task[];
        assignedTasks: import("../entities/task.entity").Task[];
        teamMemberships: import("../entities/team-member.entity").TeamMember[];
        comments: import("../entities/task-comment.entity").TaskComment[];
        watchedTasks: import("../entities/task-watcher.entity").TaskWatcher[];
        taskHistories: import("../entities/task-history.entity").TaskHistory[];
        notifications: import("../entities/notification.entity").Notification[];
    }>;
    searchUsers(query: string): Promise<import("../entities/user.entity").User[]>;
}
