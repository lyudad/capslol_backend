import { Body, Controller, Get, Post } from '@nestjs/common';
import AuthServive from './auth.service';
import CreateUserDto from './dto/create-user.dto';
import UserEntity from './user.entity';

@Controller('auth')
export default class AuthController {
  constructor(private readonly authService: AuthServive) {}

  @Get('allusers')
  async allUser(): Promise<UserEntity[]> {
    const users = await this.authService.allUsers();
    return users;
  }

  @Post('createUser')
  async createUser(@Body('user') user: CreateUserDto) {
    const createdUser = await this.authService.createUser(user);
    return createdUser;
  }
}
