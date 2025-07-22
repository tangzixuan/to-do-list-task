import { Task } from './task.entity';
export declare class RecurringTask {
    id: string;
    taskId: string;
    recurrencePattern: string;
    nextExecution: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    task: Task;
}
