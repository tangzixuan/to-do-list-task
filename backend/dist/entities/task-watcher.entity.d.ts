import { Task } from './task.entity';
import { User } from './user.entity';
export declare class TaskWatcher {
    id: string;
    taskId: string;
    userId: string;
    createdAt: Date;
    task: Task;
    user: User;
}
