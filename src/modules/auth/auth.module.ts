import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/mail/mail.module';
import AuthController from './auth.contoller';
import AuthServive from './auth.service';
import UserEntity from './entity/user.entity';
import AuthMiddlerware from './middlewares/auth.middleware';
import GoogleStrategy from './strategies/google.strategy';
import JWTStrategy from './strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    ConfigModule,
    PassportModule,
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
  providers: [AuthServive, GoogleStrategy, JWTStrategy],
})
export default class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddlerware).forRoutes({
      path: '/auth/login',
      method: RequestMethod.POST,
    });
  }
}
