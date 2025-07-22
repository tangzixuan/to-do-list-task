import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findById(id: string): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    updateProfile(userId: string, updateUserDto: UpdateUserDto): Promise<{
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
    getUserProfile(userId: string): Promise<{
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
    searchUsers(query: string): Promise<User[]>;
}
