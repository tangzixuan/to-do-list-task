import { Task } from './task.entity';
import { TeamMember } from './team-member.entity';
import { TaskComment } from './task-comment.entity';
import { TaskWatcher } from './task-watcher.entity';
import { TaskHistory } from './task-history.entity';
import { Notification } from './notification.entity';
export declare class User {
    id: string;
    email: string;
    username: string;
    passwordHash: string;
    avatarUrl?: string;
    createdAt: Date;
    updatedAt: Date;
    createdTasks: Task[];
    assignedTasks: Task[];
    teamMemberships: TeamMember[];
    comments: TaskComment[];
    watchedTasks: TaskWatcher[];
    taskHistories: TaskHistory[];
    notifications: Notification[];
}
