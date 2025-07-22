import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TaskComment } from '../entities/task-comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(TaskComment)
    private commentRepository: Repository<TaskComment>,
  ) {}

  async findTaskComments(taskId: string): Promise<TaskComment[]> {
    return this.commentRepository.find({
      where: { taskId },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  // 其他方法待实现
}
