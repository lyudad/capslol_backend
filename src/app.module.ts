import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from './mail/mail.module';
import typeOrmConfig from './typeorm.config';
import AppController from './app.controller';
import AppService from './app.service';
import AuthModule from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    AuthModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}
