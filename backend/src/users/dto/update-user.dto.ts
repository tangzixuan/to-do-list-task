import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: '用户名', required: false })
  @IsOptional()
  @IsString({ message: '用户名必须是字符串' })
  username?: string;

  @ApiProperty({ description: '头像URL', required: false })
  @IsOptional()
  @IsUrl({}, { message: '请输入有效的URL' })
  avatarUrl?: string;
}
