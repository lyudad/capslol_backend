import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import MailModule from '../mail/mail.module';
import AuthController from './auth.contoller';
import AuthServive from './auth.service';
import UserEntity from './entity/user.entity';
import AuthMiddlerware from './middlewares/auth.middleware';
import JWTStrategy from './strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    ConfigModule,
    PassportModule,
    MailModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthServive, JWTStrategy],
  exports: [AuthServive],
})
export default class AuthModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddlerware).forRoutes({
      path: '/auth/login',
      method: RequestMethod.POST,
    });
  }
}
