import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

@Injectable()
export default class AuthServive {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async allUsers(): Promise<UserEntity[]> {
    const users = await this.userRepository
      .createQueryBuilder()
      .select()
      .getMany();

    return users;
  }

  async getUserById(userId: number): Promise<UserEntity> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select('')
      .where('user.id = :userId', { userId })
      .getOne();

    return user;
  }

  async hasUserGoogleAccount(email: string): Promise<boolean> {
    const user: UserEntity = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
    if (!user) {
      return false;
    }
    return user.isGoogle;
  }

  async createUser(userInfoDto: UserInfoDto): Promise<UserEntity> {
    const newUser = new UserEntity();
    const entity = Object.assign(newUser, userInfoDto);

    const createdUser = await this.userRepository
      .createQueryBuilder()
      .insert()
      .values(entity)
      .execute();

    const user = await this.getUserById(createdUser.raw.insertId);

    return user;
  }

  async updateUser(
    userId: number,
    userInfoDto: UserInfoDto,
  ): Promise<UserEntity> {
    await this.userRepository
      .createQueryBuilder()
      .update()
      .set(userInfoDto)
      .where('id = :userId', { userId })
      .execute();

    const user = await this.getUserById(userId);

    return user;
  }

  async deleteUser(userId: number): Promise<any> {
    const deletedUser = await this.userRepository
      .createQueryBuilder()
      .delete()
      .where('id = :userId', { userId })
      .execute();

    return deletedUser;
  }

  async buildResponse(
    user: UserEntity,
    messsage: string,
  ): Promise<IUserResponse> {
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
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email } = loginUserDto;
    const user: UserEntity = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.password', 'user.email', 'user.firstName'])
      .where('user.email = :email', { email })
      .getOne();

    if (!user) {
      throw new HttpException(
        'User not exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const isPasswordCorrect = await compare(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new HttpException(
        'Wrong password',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    delete user.password;
    return user;
  }

  async googleLogin(googleUser: GoogleUserType): Promise<UserEntity> {
    const newUser = new UserEntity();
    const entity = Object.assign(newUser, googleUser, { isGoogle: true });
    const createdUser = await this.userRepository
      .createQueryBuilder()
      .insert()
      .values(entity)
      .execute();

    const user = await this.getUserById(createdUser.raw.insertId);
    return user;
  }
}
