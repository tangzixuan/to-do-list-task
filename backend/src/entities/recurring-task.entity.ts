import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Task } from './task.entity';

@Entity('recurring_tasks')
export class RecurringTask {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ name: 'task_id' })
  taskId: string;

  @ApiProperty()
  @Column({ name: 'recurrence_pattern', length: 100 })
  recurrencePattern: string; // cron expression

  @ApiProperty()
  @Column({ name: 'next_execution' })
  nextExecution: Date;

  @ApiProperty()
  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => Task)
  @JoinColumn({ name: 'task_id' })
  task: Task;
}
