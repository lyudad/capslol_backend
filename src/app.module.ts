import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import PublicProfileModule from './modules/public-profile/public-profile.module';
import typeOrmConfig from './typeorm.config';
import AppController from './app.controller';
import AppService from './app.service';
import AuthModule from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    AuthModule,
    PublicProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}
