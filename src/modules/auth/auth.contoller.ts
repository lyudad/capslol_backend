import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import AuthServive from './auth.service';
import { RESPONSE_MESSAGE } from './constants/auth.constants';
import User from './decorators/user.decorator';
import ChangePasswordDto from './dto/change-password.dto';
import CreateUserDto from './dto/create-user.dto';
import ForgotPasswordDto from './dto/forgot-password.dto';
import UserInfoDto from './dto/user-info.dto';
import LoginUserDto from './dto/user-login.dto';
import UserEntity from './entity/user.entity';
import JWTGuard from './guards/jwt.guard';
import { IResponse } from './types/response.interface';
import { IToken } from './types/password.verifyToken';
import { IUserResponse, UserType } from './types/user.interface';
import SelectRole from './dto/select-role.query';

@ApiTags('Authorization')
@Controller('auth')
export default class AuthController {
  private readonly logger: Logger;

  constructor(private readonly authService: AuthServive) {
    this.logger = new Logger();
  }

  @ApiResponse({
    status: 200,
    description: 'Users found',
    type: UserEntity,
  })
  @Get('allUsers')
  @UseGuards(JWTGuard)
  async allUsers(): Promise<IResponse<UserEntity[]>> {
    try {
      const users = await this.authService.allUsers();
      const response = await this.authService.buildResponse(
        users,
        RESPONSE_MESSAGE.USERS_FOUND,
      );
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('getUser/:id')
  @UseGuards(JWTGuard)
  async getUserById(@Param('id') userId: number): Promise<IResponse<UserType>> {
    try {
      const user = await this.authService.getUserById(userId);
      const response = this.authService.buildResponse(
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
  ): Promise<IResponse<IUserResponse>> {
    try {
      const createdUser = await this.authService.createUser(userInfoDto);
      const response = this.authService.buildResponse<IUserResponse>(
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
  ): Promise<IResponse<UserEntity>> {
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
  async deleteUser(@Param('id') userId: number): Promise<IResponse<UserType>> {
    try {
      const user = await this.authService.deleteUser(userId);
      const response = this.authService.buildResponse(
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
  ): Promise<IResponse<IUserResponse>> {
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

  @Get('createUserUseGoogle')
  async googleAuth(
    @Query('tokenId') tokenId: string,
  ): Promise<IResponse<IUserResponse>> {
    try {
      const user = await this.authService.createGoogleUser(tokenId);
      const response = this.authService.buildResponse(
        user,
        RESPONSE_MESSAGE.USER_CREATED,
      );
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('loginUseGoogle')
  async loginGoogleAuth(
    @Query('tokenId') tokenId: string,
  ): Promise<IResponse<IUserResponse>> {
    try {
      const user = await this.authService.loginGoogleUser(tokenId);
      const response = this.authService.buildResponse(
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
    @Body()
    changePasswordDto: ChangePasswordDto,
    @Query()
    verifyToken: IToken,
  ): Promise<boolean> {
    try {
      const response = await this.authService.changePasswordWithToken(
        verifyToken,
        changePasswordDto,
      );
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiBody({ type: ChangePasswordDto })
  @Put('changePasswordWithId/:id')
  @UseGuards(JWTGuard)
  async changePasswordWithId(
    @Param('id') userId: number,
    @Body() passwordDto: ChangePasswordDto,
  ): Promise<boolean> {
    try {
      const response = await this.authService.changePasswordWithId(
        userId,
        passwordDto,
      );

      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiBody({ type: SelectRole })
  @Get('/setRole')
  @UsePipes(new ValidationPipe())
  @UseGuards(JWTGuard)
  async setRole(@Query() role: SelectRole): Promise<IResponse<IUserResponse>> {
    try {
      const updatedUser = await this.authService.setRole(role);
      const response = this.authService.buildResponse(
        updatedUser,
        RESPONSE_MESSAGE.ROLE_UPDATED,
      );
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
