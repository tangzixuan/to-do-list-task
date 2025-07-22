import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from '../entities/task.entity';
import { User } from '../entities/user.entity';
import { TaskWatcher } from '../entities/task-watcher.entity';
import { TaskHistory } from '../entities/task-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User, TaskWatcher, TaskHistory])],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
