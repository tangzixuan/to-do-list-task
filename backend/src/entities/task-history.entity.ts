import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Task } from './task.entity';
import { User } from './user.entity';

@Entity('task_history')
export class TaskHistory {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ name: 'task_id' })
  taskId: string;

  @ApiProperty()
  @Column({ name: 'user_id' })
  userId: string;

  @ApiProperty()
  @Column({ length: 100 })
  action: string;

  @ApiProperty({ required: false })
  @Column({ name: 'old_value', type: 'jsonb', nullable: true })
  oldValue?: any;

  @ApiProperty({ required: false })
  @Column({ name: 'new_value', type: 'jsonb', nullable: true })
  newValue?: any;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // Relations
  @ManyToOne(() => Task)
  @JoinColumn({ name: 'task_id' })
  task: Task;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
