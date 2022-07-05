import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import ContractModule from './modules/contract/contract.module';
import InvitationModule from './modules/invitation/invitation.module';
import ProposalsModule from './modules/proposals/proposals.module';
import ExperiencesModule from './modules/experiences/experiences.module';
import EducationsModule from './modules/educations/educations.module';
import CategoriesModule from './modules/categories/categories.module';
import SkillsModule from './modules/skills/skills.module';
import PublicProfileModule from './modules/public-profile/public-profile.module';
import MailModule from './modules/mail/mail.module';
import typeOrmConfig from './typeorm.config';
import AppController from './app.controller';
import AppService from './app.service';
import AuthModule from './modules/auth/auth.module';
import LoggerMiddleware from './utils/logger.middleware';
import JobsModule from './modules/jobs/jobs.module';
import MessageModule from './modules/message/message.module';
import ChatContactsModule from './modules/chat-contacts/chat-contacts.module';
import OfferModule from './modules/offer/offer.module';
import RolesGuard from './shared/guards/roles.guard';
import UserMiddleware from './shared/middlewares/user.middleware';

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
    MailModule,
    JobsModule,
    ProposalsModule,
    MessageModule,
    ChatContactsModule,
    OfferModule,
    InvitationModule,
    ContractModule,
    JwtModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export default class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware, UserMiddleware).forRoutes('*');
  }
}
