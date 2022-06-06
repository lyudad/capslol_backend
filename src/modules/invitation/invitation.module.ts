import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import InvitationService from './invitation.service';
import InvitationController from './invitation.controller';
import InvitationEntity from './entities/invitation.entity';
import AuthModule from '../auth/auth.module';
import JobsModule from '../jobs/jobs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([InvitationEntity]),
    AuthModule,
    JobsModule,
  ],
  controllers: [InvitationController],
  providers: [InvitationService],
})
export default class InvitationModule {}
