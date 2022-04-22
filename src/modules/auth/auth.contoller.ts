import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import AuthServive from './auth.service';
import CreateUserDto from './dto/create-user.dto';
import UserEntity from './user.entity';

@ApiTags('Authorization')
@Controller('auth')
export default class AuthController {
  constructor(private readonly authService: AuthServive) { }

  @Get('allUsers')
  @ApiResponse({
    status: 200,
    description: 'Users found',
    type: UserEntity,
  })
  async allUser(): Promise<UserEntity[]> {
    const users = await this.authService.allUsers();
    return users;
  }


  @Post('createUser')
  @ApiBody({
    description: 'user',
  })
  async createUser(@Body('user') user: CreateUserDto) {
    const createdUser = await this.authService.createUser(user);
    return createdUser;
  }
}
