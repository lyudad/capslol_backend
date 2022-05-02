import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import AuthServive from './auth.service';
import User from './decorators/user.decorator';
import CreateUserDto from './dto/create-user.dto';
import UserInfoDto from './dto/user-info.dto';
import LoginUserDto from './dto/user-login.dto';
import UserEntity from './entity/user.entity';
import { IUserResponse } from './types/response.interface';

@ApiTags('Authorization')
@Controller('auth')
export default class AuthController {
  constructor(private readonly authService: AuthServive) {}

  @ApiResponse({
    status: 200,
    description: 'Users found',
    type: UserEntity,
  })
  @Get('allUsers')
  async allUsers(): Promise<IUserResponse> {
    const users = await this.authService.allUsers();
    return this.authService.buildResponse(users, 'Users were found');
  }

  @Get('getUser/:id')
  async getUserById(@Param('id') userId: number): Promise<IUserResponse> {
    const user = await this.authService.getUserById(userId);
    return this.authService.buildResponse(user, 'User was found');
  }

  @ApiBody({ type: CreateUserDto })
  @UsePipes(new ValidationPipe())
  @Post('createUser')
  async createUser(
    @Body('user') userInfoDto: UserInfoDto,
  ): Promise<IUserResponse> {
    const createdUser = await this.authService.createUser(userInfoDto);
    return this.authService.buildResponseWithToken(
      createdUser,
      'User was created',
    );
  }

  @ApiBody({ type: CreateUserDto })
  @Put('updateUser/:id')
  async updateUser(
    @Param('id') userId: number,
    @User() userInfoDto: UserInfoDto,
  ): Promise<IUserResponse> {
    const updatedUser = await this.authService.updateUser(userId, userInfoDto);
    return this.authService.buildResponse(updatedUser, 'User was updated');
  }

  @Delete('deleteUser/:id')
  async deleteUser(@Param('id') userId: number) {
    const user = await this.authService.deleteUser(userId);
    return this.authService.buildResponse(user, 'User was deleted');
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body('user') loginUserDto: LoginUserDto,
  ): Promise<IUserResponse> {
    const loggedUser = await this.authService.login(loginUserDto);
    return this.authService.buildResponseWithToken(loggedUser, 'Login success');
  }
}
