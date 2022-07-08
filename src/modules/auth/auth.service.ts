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
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import UserInfoDto from './dto/user-info.dto';
import LoginUserDto from './dto/user-login.dto';
import UserEntity from './entity/user.entity';
import { IResponse } from './types/response.interface';
import MailService from '../mail/mail.service';
import ForgotPasswordDto from './dto/forgot-password.dto';
import { IUserVerify } from '../mail/interface/userVerify.interface';
import ChangePasswordDto from './dto/change-password.dto';
import { RESPONSE_MESSAGE } from './constants/auth.constants';
import { IUserResponse, UserType } from './types/user.interface';
import { IToken } from './types/password.verifyToken';
import SelectRole from './dto/select-role.query';

@Injectable()
export default class AuthServive {
  private readonly client: OAuth2Client;

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {
    this.client = new OAuth2Client(this.configService.get('GOOGLE_CLIENT_ID'));
  }

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

  async createUser(userInfoDto: UserInfoDto): Promise<IUserResponse> {
    try {
      await this.checkEmail(userInfoDto.email);
      const newUser = new UserEntity();
      const entity = Object.assign(newUser, userInfoDto);

      const createdUser = await this.userRepository
        .createQueryBuilder()
        .insert()
        .values(entity)
        .execute();

      const user = await this.getUserById(createdUser.raw.insertId);
      delete user.password;

      if (!user.isGoogle) {
        await this.sentConfirmMessage(user, 'confirmation');
      }

      if (user.isGoogle) {
        await this.handleIsConfirmed(user.id);
      }

      const userWithToken = await this.generateJWT(user);

      return userWithToken;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async createGoogleUser(idToken: string): Promise<IUserResponse> {
    try {
      const payload = await this.verifyGoogleUser(idToken);
      const { email, given_name: givenName, family_name: familyName } = payload;

      const googleUser: Partial<UserEntity> = {
        email,
        isGoogle: true,
      };
      const googleFirstName = givenName.split(' ')[0];
      const GoogleLastName = givenName.split(' ')[1];

      if (GoogleLastName) {
        Object.assign(googleUser, { lastName: GoogleLastName } as UserEntity);
      }

      if (familyName) {
        Object.assign(googleUser, { lastName: familyName } as UserEntity);
      }

      Object.assign(googleUser, { firstName: googleFirstName } as UserEntity);
      await this.checkEmail(email);

      const newUser = new UserEntity();
      const entity = Object.assign(newUser, googleUser);

      const createdGoogleUser = await this.createUser(entity);
      return createdGoogleUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async loginGoogleUser(idToken: string): Promise<IUserResponse> {
    try {
      const payload = await this.verifyGoogleUser(idToken);
      const { email } = payload;

      const loggedUser = await this.getUserByEmail(email);
      if (!loggedUser) {
        throw new HttpException(
          RESPONSE_MESSAGE.USER_NOT_FOUND,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      const userWithToken = await this.generateJWT(loggedUser);
      return userWithToken;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .select()
        .where('user.email = :email', { email })
        .getOne();
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async verifyGoogleUser(idToken: string): Promise<TokenPayload> {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken,
        audience: this.configService.get('GOOGLE_CLIENT_ID'),
      });

      const payload = ticket.getPayload();
      return payload;
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

  async deleteUser(userId: number): Promise<UserType> {
    try {
      const removerUser = await this.getUserById(userId);

      if (!removerUser) {
        throw new HttpException(
          RESPONSE_MESSAGE.USER_NOT_EXISTS,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      await this.userRepository
        .createQueryBuilder()
        .delete()
        .where('id = :userId', { userId })
        .execute();

      return removerUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  buildResponse<T>(data: T, message: string): IResponse<T> {
    const response = {
      data,
      message,
    };
    return response;
  }

  async generateJWT(user: UserType): Promise<IUserResponse> {
    try {
      const userIsAssignedToken = {
        user: {
          ...user,
        },
        accessToken: await this.jwtService.signAsync({ ...user }),
      };
      return userIsAssignedToken;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async checkEmail(email: string): Promise<boolean> {
    try {
      const isEmailExist = await this.userRepository
        .createQueryBuilder('user')
        .where('user.email = :email', { email })
        .getOne();
      if (isEmailExist) {
        throw new HttpException(
          RESPONSE_MESSAGE.EMAIL_EXISTS,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      return false;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<IUserResponse> {
    try {
      const { email } = loginUserDto;
      const user: UserEntity = await this.userRepository
        .createQueryBuilder('user')
        .select([
          'user.id',
          'user.email',
          'user.lastName',
          'user.firstName',
          'user.phoneNumber',
          'user.createdAt',
          'user.role',
          'user.isGoogle',
          'user.password',
        ])
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

      const loggedUser = await this.getUserById(user.id);

      if (!loggedUser.isConfirmed) {
        throw new HttpException(
          RESPONSE_MESSAGE.EMAIL_NOT_CONFIRMED,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      const userWithToken = await this.generateJWT(loggedUser);

      return userWithToken;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async sentConfirmMessage(user: UserEntity, route: string): Promise<void> {
    try {
      const confirmedToken = await this.jwtService.sign({ id: user.id });
      const verifyUrl = `${this.configService.get(
        'FE_APP_URL',
      )}/${route}/?token=${confirmedToken}`;
      const userVerify: IUserVerify = {
        email: user.email,
        name: user.firstName,
      };

      await this.mailService.sendUserConfirmation(userVerify, verifyUrl);
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

      await this.sentConfirmMessage(user, 'reset_password');

      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async changePassword(
    password: ChangePasswordDto,
    id: number,
  ): Promise<UserEntity> {
    try {
      const user = this.userRepository.findOne(id);
      (await user).password = password.password;
      return await this.userRepository.save(await user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async changePasswordWithToken(
    verifyToken: IToken,
    passwordDto: ChangePasswordDto,
  ): Promise<UserEntity> {
    const { id } = await this.jwtService.verify(verifyToken.token);
    try {
      return await this.changePassword(passwordDto, id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async changePasswordWithId(
    userId: number,
    passwordDto: ChangePasswordDto,
  ): Promise<UserEntity> {
    try {
      return await this.changePassword(passwordDto, userId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async setRole(role: SelectRole): Promise<IUserResponse> {
    try {
      await this.userRepository
        .createQueryBuilder('user')
        .update()
        .set({
          role: role.role,
        })
        .where('id = :id', { id: role.userId })
        .execute();
      const updatedUser = await this.userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: role.userId })
        .getOne();
      return {
        user: updatedUser,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async handleIsConfirmed(userId: number): Promise<UserEntity> {
    try {
      await this.userRepository
        .createQueryBuilder('user')
        .update()
        .set({
          isConfirmed: true,
        })
        .where('id = :id', { id: userId })
        .execute();

      const confirmedUser = await this.getUserById(userId);

      return confirmedUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async confirmEmail(verifyToken: IToken): Promise<IUserResponse> {
    try {
      const { id } = await this.jwtService.verify(verifyToken.token);

      await this.handleIsConfirmed(id);

      const updatedUser = await this.getUserById(id);

      return {
        user: updatedUser,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
