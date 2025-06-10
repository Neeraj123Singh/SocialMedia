import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':address')
  async findOne(@Param('address') address: string): Promise<User> {
    return this.usersService.findOne(address);
  }

  @Post()
  async create(@Body() createUserDto: { address: string }): Promise<User> {
    return this.usersService.create(createUserDto.address);
  }
} 