"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("../entities/task.entity");
const user_entity_1 = require("../entities/user.entity");
let TasksService = class TasksService {
    constructor(taskRepository, userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }
    async findUserTasks(userId) {
        return this.taskRepository
            .createQueryBuilder('task')
            .leftJoinAndSelect('task.creator', 'creator')
            .leftJoinAndSelect('task.assignee', 'assignee')
            .where('task.creatorId = :userId OR task.assigneeId = :userId', { userId })
            .orderBy('task.createdAt', 'DESC')
            .getMany();
    }
    async create(userId, createTaskDto) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('用户不存在');
        }
        let assignee = null;
        if (createTaskDto.assigneeId) {
            assignee = await this.userRepository.findOne({ where: { id: createTaskDto.assigneeId } });
            if (!assignee) {
                throw new common_1.NotFoundException('指定的负责人不存在');
            }
        }
        let status = task_entity_1.TaskStatus.PENDING;
        if (createTaskDto.status === 'todo')
            status = task_entity_1.TaskStatus.PENDING;
        else if (createTaskDto.status === 'in_progress')
            status = task_entity_1.TaskStatus.IN_PROGRESS;
        else if (createTaskDto.status === 'completed')
            status = task_entity_1.TaskStatus.COMPLETED;
        let priority = task_entity_1.TaskPriority.MEDIUM;
        if (createTaskDto.priority === 'low')
            priority = task_entity_1.TaskPriority.LOW;
        else if (createTaskDto.priority === 'medium')
            priority = task_entity_1.TaskPriority.MEDIUM;
        else if (createTaskDto.priority === 'high')
            priority = task_entity_1.TaskPriority.HIGH;
        const task = this.taskRepository.create({
            title: createTaskDto.title,
            description: createTaskDto.description,
            status,
            priority,
            dueDate: createTaskDto.dueDate ? new Date(createTaskDto.dueDate) : null,
            creator: user,
            assignee: assignee || user,
        });
        return this.taskRepository.save(task);
    }
    async update(userId, taskId, updateTaskDto) {
        const task = await this.taskRepository.findOne({
            where: { id: taskId },
            relations: ['creator', 'assignee'],
        });
        if (!task) {
            throw new common_1.NotFoundException('任务不存在');
        }
        if (task.creator.id !== userId && task.assignee?.id !== userId) {
            throw new common_1.ForbiddenException('您没有权限编辑此任务');
        }
        if (updateTaskDto.assigneeId) {
            const assignee = await this.userRepository.findOne({ where: { id: updateTaskDto.assigneeId } });
            if (!assignee) {
                throw new common_1.NotFoundException('指定的负责人不存在');
            }
            task.assignee = assignee;
        }
        if (updateTaskDto.title !== undefined)
            task.title = updateTaskDto.title;
        if (updateTaskDto.description !== undefined)
            task.description = updateTaskDto.description;
        if (updateTaskDto.dueDate !== undefined)
            task.dueDate = updateTaskDto.dueDate ? new Date(updateTaskDto.dueDate) : null;
        if (updateTaskDto.status) {
            if (updateTaskDto.status === 'todo')
                task.status = task_entity_1.TaskStatus.PENDING;
            else if (updateTaskDto.status === 'in_progress')
                task.status = task_entity_1.TaskStatus.IN_PROGRESS;
            else if (updateTaskDto.status === 'completed')
                task.status = task_entity_1.TaskStatus.COMPLETED;
        }
        if (updateTaskDto.priority) {
            if (updateTaskDto.priority === 'low')
                task.priority = task_entity_1.TaskPriority.LOW;
            else if (updateTaskDto.priority === 'medium')
                task.priority = task_entity_1.TaskPriority.MEDIUM;
            else if (updateTaskDto.priority === 'high')
                task.priority = task_entity_1.TaskPriority.HIGH;
        }
        return this.taskRepository.save(task);
    }
    async remove(userId, taskId) {
        const task = await this.taskRepository.findOne({
            where: { id: taskId },
            relations: ['creator'],
        });
        if (!task) {
            throw new common_1.NotFoundException('任务不存在');
        }
        if (task.creator.id !== userId) {
            throw new common_1.ForbiddenException('您没有权限删除此任务');
        }
        await this.taskRepository.remove(task);
        return { message: '任务删除成功' };
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TasksService);
//# sourceMappingURL=tasks.service.js.map