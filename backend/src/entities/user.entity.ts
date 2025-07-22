import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Task } from './task.entity';
import { TeamMember } from './team-member.entity';
import { TaskComment } from './task-comment.entity';
import { TaskWatcher } from './task-watcher.entity';
import { TaskHistory } from './task-history.entity';
import { Notification } from './notification.entity';

@Entity('users')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column()
  username: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;

  @ApiProperty({ required: false })
  @Column({ name: 'avatar_url', nullable: true })
  avatarUrl?: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @OneToMany(() => Task, task => task.creator)
  createdTasks: Task[];

  @OneToMany(() => Task, task => task.assignee)
  assignedTasks: Task[];

  @OneToMany(() => TeamMember, member => member.user)
  teamMemberships: TeamMember[];

  @OneToMany(() => TaskComment, comment => comment.user)
  comments: TaskComment[];

  @OneToMany(() => TaskWatcher, watcher => watcher.user)
  watchedTasks: TaskWatcher[];

  @OneToMany(() => TaskHistory, history => history.user)
  taskHistories: TaskHistory[];

  @OneToMany(() => Notification, notification => notification.user)
  notifications: Notification[];
}
