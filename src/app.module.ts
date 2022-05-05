import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ExperiencesModule from './modules/experiences/experiences.module';
import { EducationsModule } from './modules/educations/educations.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { SkillsModule } from './modules/skills/skills.module';
import { SkillProfileModule } from './modules/skill-profile/skill-profile.module';
import PublicProfileModule from './modules/public-profile/public-profile.module';
import MailModule from './modules/mail/mail.module';
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
    ExperiencesModule,
    EducationsModule,
    CategoriesModule,
    SkillsModule,
    SkillProfileModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}
