import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PublicProfileService from './public-profile.service';
import PublicProfileController from './public-profile.controller';
import PublicProfile from './entities/public-profile.entity';
import SkillEntity from '../skills/entities/skill.entity';
import InvitationModule from '../invitation/invitation.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PublicProfile, SkillEntity]),
    InvitationModule,
  ],
  controllers: [PublicProfileController],
  providers: [PublicProfileService],
})
export default class PublicProfileModule {}
