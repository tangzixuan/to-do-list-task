import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task, TaskStatus, TaskPriority } from '../entities/task.entity';
import { User } from '../entities/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findUserTasks(userId: string): Promise<Task[]> {
    return this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.creator', 'creator')
      .leftJoinAndSelect('task.assignee', 'assignee')
      .where('task.creatorId = :userId OR task.assigneeId = :userId', { userId })
      .orderBy('task.createdAt', 'DESC')
      .getMany();
  }

  async create(userId: string, createTaskDto: CreateTaskDto): Promise<Task> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    let assignee = null;
    if (createTaskDto.assigneeId) {
      assignee = await this.userRepository.findOne({ where: { id: createTaskDto.assigneeId } });
      if (!assignee) {
        throw new NotFoundException('指定的负责人不存在');
      }
    }

    // 转换状态枚举
    let status = TaskStatus.PENDING;
    if (createTaskDto.status === 'todo') status = TaskStatus.PENDING;
    else if (createTaskDto.status === 'in_progress') status = TaskStatus.IN_PROGRESS;
    else if (createTaskDto.status === 'completed') status = TaskStatus.COMPLETED;

    // 转换优先级枚举
    let priority = TaskPriority.MEDIUM;
    if (createTaskDto.priority === 'low') priority = TaskPriority.LOW;
    else if (createTaskDto.priority === 'medium') priority = TaskPriority.MEDIUM;
    else if (createTaskDto.priority === 'high') priority = TaskPriority.HIGH;

    const task = this.taskRepository.create({
      title: createTaskDto.title,
      description: createTaskDto.description,
      status,
      priority,
      dueDate: createTaskDto.dueDate ? new Date(createTaskDto.dueDate) : null,
      creator: user,
      assignee: assignee || user, // 如果没有指定负责人，默认为创建者
    });

    return this.taskRepository.save(task);
  }

  async update(userId: string, taskId: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
      relations: ['creator', 'assignee'],
    });

    if (!task) {
      throw new NotFoundException('任务不存在');
    }

    // 检查权限：只有创建者或负责人可以编辑任务
    if (task.creator.id !== userId && task.assignee?.id !== userId) {
      throw new ForbiddenException('您没有权限编辑此任务');
    }

    // 如果更新了负责人
    if (updateTaskDto.assigneeId) {
      const assignee = await this.userRepository.findOne({ where: { id: updateTaskDto.assigneeId } });
      if (!assignee) {
        throw new NotFoundException('指定的负责人不存在');
      }
      task.assignee = assignee;
    }

    // 更新其他字段
    if (updateTaskDto.title !== undefined) task.title = updateTaskDto.title;
    if (updateTaskDto.description !== undefined) task.description = updateTaskDto.description;
    if (updateTaskDto.dueDate !== undefined) task.dueDate = updateTaskDto.dueDate ? new Date(updateTaskDto.dueDate) : null;
    
    // 转换状态枚举
    if (updateTaskDto.status) {
      if (updateTaskDto.status === 'todo') task.status = TaskStatus.PENDING;
      else if (updateTaskDto.status === 'in_progress') task.status = TaskStatus.IN_PROGRESS;
      else if (updateTaskDto.status === 'completed') task.status = TaskStatus.COMPLETED;
    }

    // 转换优先级枚举
    if (updateTaskDto.priority) {
      if (updateTaskDto.priority === 'low') task.priority = TaskPriority.LOW;
      else if (updateTaskDto.priority === 'medium') task.priority = TaskPriority.MEDIUM;
      else if (updateTaskDto.priority === 'high') task.priority = TaskPriority.HIGH;
    }

    return this.taskRepository.save(task);
  }

  async remove(userId: string, taskId: string): Promise<{ message: string }> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
      relations: ['creator'],
    });

    if (!task) {
      throw new NotFoundException('任务不存在');
    }

    // 检查权限：只有创建者可以删除任务
    if (task.creator.id !== userId) {
      throw new ForbiddenException('您没有权限删除此任务');
    }

    await this.taskRepository.remove(task);
    return { message: '任务删除成功' };
  }
}
