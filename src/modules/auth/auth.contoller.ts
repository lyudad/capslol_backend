import { Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import AuthServive from './auth.service';
import { User } from './decorators/user.decorator';
import CreateUserDto, { UserInfoDto } from './dto/create-user.dto';
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
  @ApiBody({ type: CreateUserDto })
  async createUser(@User() userInfoDto: UserInfoDto) {
    const createdUser = await this.authService.createUser(userInfoDto);
    return createdUser;
  }
}
