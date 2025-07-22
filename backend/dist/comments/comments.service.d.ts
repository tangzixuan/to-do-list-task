import { Repository } from 'typeorm';
import { TaskComment } from '../entities/task-comment.entity';
export declare class CommentsService {
    private commentRepository;
    constructor(commentRepository: Repository<TaskComment>);
    findTaskComments(taskId: string): Promise<TaskComment[]>;
}
