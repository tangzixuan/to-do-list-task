import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
import { Team } from './team.entity';
import { TaskComment } from './task-comment.entity';
import { TaskWatcher } from './task-watcher.entity';
import { TaskHistory } from './task-history.entity';
import { RecurringTask } from './recurring-task.entity';

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

@Entity('tasks')
export class Task {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ length: 500 })
  title: string;

  @ApiProperty({ required: false })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @ApiProperty({ enum: TaskStatus })
  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  status: TaskStatus;

  @ApiProperty({ enum: TaskPriority })
  @Column({
    type: 'enum',
    enum: TaskPriority,
    default: TaskPriority.MEDIUM,
  })
  priority: TaskPriority;

  @ApiProperty({ required: false })
  @Column({ name: 'due_date', nullable: true })
  dueDate?: Date;

  @ApiProperty({ required: false })
  @Column({ name: 'planned_completion_date', nullable: true })
  plannedCompletionDate?: Date;

  @ApiProperty({ required: false })
  @Column({ name: 'completed_at', nullable: true })
  completedAt?: Date;

  @ApiProperty()
  @Column({ name: 'creator_id' })
  creatorId: string;

  @ApiProperty({ required: false })
  @Column({ name: 'assignee_id', nullable: true })
  assigneeId?: string;

  @ApiProperty({ required: false })
  @Column({ name: 'team_id', nullable: true })
  teamId?: string;

  @ApiProperty({ required: false })
  @Column({ name: 'parent_task_id', nullable: true })
  parentTaskId?: string;

  @ApiProperty()
  @Column({ default: 0 })
  position: number;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User)
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'assignee_id' })
  assignee?: User;

  @ManyToOne(() => Team)
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @ManyToOne(() => Task, { nullable: true })
  @JoinColumn({ name: 'parent_task_id' })
  parentTask?: Task;

  @OneToMany(() => Task, task => task.parentTask)
  subtasks: Task[];

  @OneToMany(() => TaskComment, comment => comment.task)
  comments: TaskComment[];

  @OneToMany(() => TaskWatcher, watcher => watcher.task)
  watchers: TaskWatcher[];

  @OneToMany(() => TaskHistory, history => history.task)
  histories: TaskHistory[];

  @OneToMany(() => RecurringTask, recurring => recurring.task)
  recurringConfigs: RecurringTask[];
}
