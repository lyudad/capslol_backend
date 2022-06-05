import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import JobsService from './jobs.service';
import JobsController from './jobs.controller';
import JobEntity from './entities/job.entity';
import SkillEntity from '../skills/entities/skill.entity';
import AuthModule from '../auth/auth.module';
import CategoriesModule from '../categories/categories.module';
import SkillsModule from '../skills/skills.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobEntity, SkillEntity]),
    AuthModule,
    CategoriesModule,
    SkillsModule,
  ],
  controllers: [JobsController],
  providers: [JobsService],
  exports: [JobsService],
})
export default class JobsModule {}
