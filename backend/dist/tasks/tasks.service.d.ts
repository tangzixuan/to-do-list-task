import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { User } from '../entities/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksService {
    private taskRepository;
    private userRepository;
    constructor(taskRepository: Repository<Task>, userRepository: Repository<User>);
    findUserTasks(userId: string): Promise<Task[]>;
    create(userId: string, createTaskDto: CreateTaskDto): Promise<Task>;
    update(userId: string, taskId: string, updateTaskDto: UpdateTaskDto): Promise<Task>;
    remove(userId: string, taskId: string): Promise<{
        message: string;
    }>;
}
