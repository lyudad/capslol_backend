import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { IUserVerify } from 'src/mail/interface.ts/userVerifyInterface';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import UserEntity from './entity/user.entity';

@Injectable()
export default class PasswordService {
  private readonly feUrl: string;

  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {
    this.feUrl = this.configService.get('FE_APP_URL');
  }

  async forgotPassword(
    forgotPasswordDto: ForgotPasswordDto,
  ): Promise<UserEntity> {
    const user = await this.repository.findOne({
      where: { email: forgotPasswordDto.email },
    });

    if (!user.email) {
      throw new BadRequestException('Invalid email');
    }
    const token = user.id;
    const url = `${this.feUrl}/reset_password/?token=${token}`;
    const userVerify: IUserVerify = { email: user.email, name: user.firstName };

    await this.mailService.sendUserConfirmation(userVerify, url);

    return user;
  }

  async changePassword(
    userId: number,
    changePasswordDto: ChangePasswordDto,
  ): Promise<boolean> {
    const password = await this.hashPassword(changePasswordDto.password);
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ password })
      .where('id =:id', { id: userId })
      .execute();

    return true;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
