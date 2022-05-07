import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import UserInfoDto from './dto/user-info.dto';
import LoginUserDto from './dto/user-login.dto';
import UserEntity from './entity/user.entity';
import { IUserResponse } from './types/response.interface';
import { GoogleUserType } from './types/google.type';
import { JWTPayload } from './types/jwt.payload';
import MailService from '../mail/mail.service';
import ForgotPasswordDto from './dto/forgot-password.dto';
import { IUserVerify } from '../mail/interface/userVerify.interface';
import ChangePasswordDto from './dto/change-password.dto';
import { RESPONSE_MESSAGE } from './constants/auth.constants';
import { IToken } from './types/password.verifyToken';

@Injectable()
export default class AuthServive {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  async allUsers(): Promise<UserEntity[]> {
    try {
      const users = await this.userRepository
        .createQueryBuilder()
        .select()
        .getMany();

      return users;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async getUserById(userId: number): Promise<UserEntity> {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .select('')
        .where('user.id = :userId', { userId })
        .getOne();

      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async hasUserGoogleAccount(email: string): Promise<boolean> {
    try {
      const user: UserEntity = await this.userRepository
        .createQueryBuilder('user')
        .where('user.email = :email', { email })
        .getOne();
      if (!user) {
        return false;
      }
      return user.isGoogle;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async createUser(userInfoDto: UserInfoDto): Promise<UserEntity> {
    try {
      const newUser = new UserEntity();
      const entity = Object.assign(newUser, userInfoDto);

      const createdUser = await this.userRepository
        .createQueryBuilder()
        .insert()
        .values(entity)
        .execute();

      const user = await this.getUserById(createdUser.raw.insertId);
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async updateUser(
    userId: number,
    userInfoDto: UserInfoDto,
  ): Promise<UserEntity> {
    try {
      await this.userRepository
        .createQueryBuilder()
        .update()
        .set(userInfoDto)
        .where('id = :userId', { userId })
        .execute();

      const user = await this.getUserById(userId);
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async deleteUser(userId: number): Promise<any> {
    try {
      const deletedUser = await this.userRepository
        .createQueryBuilder()
        .delete()
        .where('id = :userId', { userId })
        .execute();

      return deletedUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async buildResponse(
    user: UserEntity,
    messsage: string,
  ): Promise<IUserResponse> {
    try {
      const payload: JWTPayload = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
      };
      return {
        user,
        message: messsage,
        accessToken: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    try {
      const { email } = loginUserDto;
      const user: UserEntity = await this.userRepository
        .createQueryBuilder('user')
        .select(['user.password', 'user.email', 'user.firstName'])
        .where('user.email = :email', { email })
        .getOne();

      if (!user) {
        throw new HttpException(
          RESPONSE_MESSAGE.USER_NOT_FOUND,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      const isPasswordCorrect = await compare(
        loginUserDto.password,
        user.password,
      );

      if (!isPasswordCorrect) {
        throw new HttpException(
          RESPONSE_MESSAGE.CREDENTIAL_NOT_VALID,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      delete user.password;
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async googleUserRegistration(
    googleUser: GoogleUserType,
  ): Promise<UserEntity> {
    try {
      const newUser = new UserEntity();
      const entity = Object.assign(newUser, googleUser, { isGoogle: true });
      const createdUser = await this.userRepository
        .createQueryBuilder()
        .insert()
        .values(entity)
        .execute();

      const user = await this.getUserById(createdUser.raw.insertId);
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async forgotPassword(
    forgotPasswordDto: ForgotPasswordDto,
  ): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: forgotPasswordDto.email },
      });

      if (!user.email) {
        throw new BadRequestException('Invalid email');
      }

      const token = await this.jwtService.sign({ id: user.id });
      const url = `${this.configService.get(
        'FE_APP_URL',
      )}/reset_password/?token=${token}`;
      const userVerify: IUserVerify = {
        email: user.email,
        name: user.firstName,
      };

      await this.mailService.sendUserConfirmation(userVerify, url);

      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async changePassword(
    verifyToken: IToken,
    password: ChangePasswordDto,
  ): Promise<boolean> {
    const { id } = await this.jwtService.verify(verifyToken.token);
    try {
      await this.userRepository
        .createQueryBuilder()
        .update()
        .set(password)
        .where('id =:id', { id })
        .execute();

      return true;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
