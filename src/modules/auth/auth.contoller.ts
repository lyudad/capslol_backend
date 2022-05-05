import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import AuthServive from './auth.service';
import {
  RESPONSE_MESSAGE,
  USER_UNAUTHORIZED,
} from './constants/auth.constants';
import User from './decorators/user.decorator';
import ChangePasswordDto from './dto/change-password.dto';
import CreateUserDto from './dto/create-user.dto';
import ForgotPasswordDto from './dto/forgot-password.dto';
import UserInfoDto from './dto/user-info.dto';
import LoginUserDto from './dto/user-login.dto';
import UserEntity from './entity/user.entity';
import GoogleGuard from './guards/google.guard';
import JWTGuard from './guards/jwt.guard';
import { ExpressRequest } from './types/expressRequest.interface';
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
  @UseGuards(JWTGuard)
  async allUsers() {
    try {
      const users = await this.authService.allUsers();
      return users;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('getUser/:id')
  @UseGuards(JWTGuard)
  async getUserById(@Param('id') userId: number): Promise<IUserResponse> {
    try {
      const user = await this.authService.getUserById(userId);
      const response = await this.authService.buildResponse(
        user,
        RESPONSE_MESSAGE.USER_FOUND,
      );
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiBody({ type: CreateUserDto })
  @UsePipes(new ValidationPipe())
  @Post('createUser')
  async createUser(
    @Body('user') userInfoDto: UserInfoDto,
  ): Promise<IUserResponse> {
    try {
      const createdUser = await this.authService.createUser(userInfoDto);
      const response = await this.authService.buildResponse(
        createdUser,
        RESPONSE_MESSAGE.USER_CREATED,
      );
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiBody({ type: CreateUserDto })
  @Put('updateUser/:id')
  @UseGuards(JWTGuard)
  async updateUser(
    @Param('id') userId: number,
    @User() userInfoDto: UserInfoDto,
  ): Promise<IUserResponse> {
    try {
      const updatedUser = await this.authService.updateUser(
        userId,
        userInfoDto,
      );
      const response = this.authService.buildResponse(
        updatedUser,
        RESPONSE_MESSAGE.USER_UPDATED,
      );
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('deleteUser/:id')
  @UseGuards(JWTGuard)
  async deleteUser(@Param('id') userId: number) {
    try {
      const user = await this.authService.deleteUser(userId);
      const response = await this.authService.buildResponse(
        user,
        RESPONSE_MESSAGE.USER_DELETED,
      );
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body('user') loginUserDto: LoginUserDto,
  ): Promise<IUserResponse> {
    try {
      const loggedUser = await this.authService.login(loginUserDto);
      const response = this.authService.buildResponse(
        loggedUser,
        RESPONSE_MESSAGE.LOGIN_SUCCESS,
      );
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('google/redirect')
  @UseGuards(GoogleGuard)
  async googleAuthRedirect(@Req() req: ExpressRequest) {
    try {
      if (!req.user) {
        throw new UnauthorizedException(USER_UNAUTHORIZED);
      }
      const user = await this.authService.googleUserRegistration(req.user);
      const response = await this.authService.buildResponse(
        user,
        RESPONSE_MESSAGE.USER_CREATED,
      );
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiBody({ type: ForgotPasswordDto })
  @Post('forgotPassword')
  @UsePipes(new ValidationPipe())
  async sendConfirmation(
    @Body() email: ForgotPasswordDto,
  ): Promise<UserEntity> {
    try {
      const response = await this.authService.forgotPassword(email);
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiBody({ type: ChangePasswordDto })
  @Put('changePassword')
  @UsePipes(new ValidationPipe())
  async changePassword(
    @User() user: UserEntity,
    @Body('user')
    changePasswordDto: ChangePasswordDto,
  ): Promise<boolean> {
    try {
      const response = await this.authService.changePassword(
        user.id,
        changePasswordDto,
      );
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
