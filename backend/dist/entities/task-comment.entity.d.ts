import { Task } from './task.entity';
import { User } from './user.entity';
export declare class TaskComment {
    id: string;
    taskId: string;
    userId: string;
    content: string;
    parentCommentId?: string;
    createdAt: Date;
    updatedAt: Date;
    task: Task;
    user: User;
    parentComment?: TaskComment;
}
