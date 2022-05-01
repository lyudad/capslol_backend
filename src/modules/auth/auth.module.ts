import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/mail/mail.module';
import AuthController from './auth.contoller';
import AuthServive from './auth.service';
import UserEntity from './entity/user.entity';
import PasswordController from './password.controller';
import PasswordService from './password.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), MailModule],
  controllers: [AuthController, PasswordController],
  providers: [AuthServive, PasswordService],
})
export default class AuthModule {}
