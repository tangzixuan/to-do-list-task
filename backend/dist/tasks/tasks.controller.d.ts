import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    getUserTasks(req: any): Promise<import("../entities/task.entity").Task[]>;
    createTask(req: any, createTaskDto: CreateTaskDto): Promise<import("../entities/task.entity").Task>;
    updateTask(req: any, id: string, updateTaskDto: UpdateTaskDto): Promise<import("../entities/task.entity").Task>;
    deleteTask(req: any, id: string): Promise<{
        message: string;
    }>;
}
