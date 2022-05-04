import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { IUserVerify } from './interface/userVerify.interface';

@Injectable()
export default class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmation(user: IUserVerify, url: string): Promise<void> {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Nice App! Confirm your Email',
      template: '/confirmation',
      context: {
        name: user.name,
        url,
      },
    });
  }
}
