import { User } from './user.entity';
import { Team } from './team.entity';
import { TaskComment } from './task-comment.entity';
import { TaskWatcher } from './task-watcher.entity';
import { TaskHistory } from './task-history.entity';
import { RecurringTask } from './recurring-task.entity';
export declare enum TaskStatus {
    PENDING = "pending",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}
export declare enum TaskPriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    URGENT = "urgent"
}
export declare class Task {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate?: Date;
    plannedCompletionDate?: Date;
    completedAt?: Date;
    creatorId: string;
    assigneeId?: string;
    teamId?: string;
    parentTaskId?: string;
    position: number;
    createdAt: Date;
    updatedAt: Date;
    creator: User;
    assignee?: User;
    team: Team;
    parentTask?: Task;
    subtasks: Task[];
    comments: TaskComment[];
    watchers: TaskWatcher[];
    histories: TaskHistory[];
    recurringConfigs: RecurringTask[];
}
