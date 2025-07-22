import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('用户不存在');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async updateProfile(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.findById(userId);
    
    Object.assign(user, updateUserDto);
    
    const updatedUser = await this.userRepository.save(user);
    
    // 不返回密码
    const { passwordHash, ...result } = updatedUser;
    return result;
  }

  async getUserProfile(userId: string) {
    const user = await this.findById(userId);
    const { passwordHash, ...result } = user;
    return result;
  }

  async searchUsers(query: string): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.username ILIKE :query OR user.email ILIKE :query', {
        query: `%${query}%`,
      })
      .select(['user.id', 'user.username', 'user.email', 'user.avatarUrl'])
      .getMany();
  }
}
