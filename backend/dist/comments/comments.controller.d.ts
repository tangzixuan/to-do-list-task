import { CommentsService } from './comments.service';
export declare class CommentsController {
    private commentsService;
    constructor(commentsService: CommentsService);
    getTaskComments(taskId: string): Promise<import("../entities/task-comment.entity").TaskComment[]>;
}
