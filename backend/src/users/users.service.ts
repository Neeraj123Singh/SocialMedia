import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(address: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { wallet_address: address } });
  }

  async create(address: string): Promise<User> {
    const user = this.usersRepository.create({ wallet_address: address });
    return this.usersRepository.save(user);
  }

  async findOrCreate(address: string): Promise<User> {
    let user = await this.findOne(address);
    if (!user) {
      user = await this.create(address);
    }
    return user;
  }
} 