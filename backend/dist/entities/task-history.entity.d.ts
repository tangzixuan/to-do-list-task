import { Task } from './task.entity';
import { User } from './user.entity';
export declare class TaskHistory {
    id: string;
    taskId: string;
    userId: string;
    action: string;
    oldValue?: any;
    newValue?: any;
    createdAt: Date;
    task: Task;
    user: User;
}
