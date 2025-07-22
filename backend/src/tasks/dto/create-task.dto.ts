import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ description: '任务标题', example: '完成项目设计' })
  @IsString({ message: '标题必须是字符串' })
  title: string;

  @ApiProperty({ description: '任务描述', example: '设计用户界面和用户体验', required: false })
  @IsOptional()
  @IsString({ message: '描述必须是字符串' })
  description?: string;

  @ApiProperty({ 
    description: '任务状态', 
    enum: ['todo', 'in_progress', 'completed'], 
    example: 'todo',
    required: false 
  })
  @IsOptional()
  @IsEnum(['todo', 'in_progress', 'completed'], { message: '状态必须是 todo, in_progress 或 completed' })
  status?: 'todo' | 'in_progress' | 'completed';

  @ApiProperty({ 
    description: '任务优先级', 
    enum: ['low', 'medium', 'high'], 
    example: 'medium',
    required: false 
  })
  @IsOptional()
  @IsEnum(['low', 'medium', 'high'], { message: '优先级必须是 low, medium 或 high' })
  priority?: 'low' | 'medium' | 'high';

  @ApiProperty({ description: '截止日期', example: '2024-01-30', required: false })
  @IsOptional()
  @IsDateString({}, { message: '截止日期格式不正确' })
  dueDate?: string;

  @ApiProperty({ description: '负责人ID', example: 'user-uuid', required: false })
  @IsOptional()
  @IsString({ message: '负责人ID必须是字符串' })
  assigneeId?: string;
}
