import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import UserInfoDto from './dto/user-info.dto';
import LoginUserDto from './dto/user-login.dto';
import UserEntity from './entity/user.entity';
import { IUserResponse } from './types/response.interface';

@Injectable()
export default class AuthServive {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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
      .where('user.id = :userId', { userId })
      .getOne();

    return user;
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

  buildResponse(
    user: UserEntity | UserEntity[],
    messsage: string,
  ): IUserResponse {
    return {
      user,
      message: messsage,
    };
  }

  generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        username: user.firstName,
        email: user.email,
      },
      process.env.JWT_SECRET,
    );
  }

  buildResponseWithToken(user: UserEntity, messsage: string): IUserResponse {
    return {
      user,
      token: this.generateJwt(user),
      message: messsage,
    };
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOne(
      {
        email: loginUserDto.email,
      },
      {
        select: [
          'id',
          'firstName',
          'lastName',
          'role',
          'email',
          'phoneNumber',
          'createdAt',
          'password',
        ],
      },
    );

    if (!user) {
      throw new HttpException(
        'Credential are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const isPasswordCorrect = await compare(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new HttpException(
        'Credential are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    delete user.password;
    return user;
  }
}
