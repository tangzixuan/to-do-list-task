export declare class CreateTaskDto {
    title: string;
    description?: string;
    status?: 'todo' | 'in_progress' | 'completed';
    priority?: 'low' | 'medium' | 'high';
    dueDate?: string;
    assigneeId?: string;
}
