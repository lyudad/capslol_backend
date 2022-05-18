import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import JobsService from './jobs.service';
import JobsController from './jobs.controller';
import JobEntity from './entities/job.entity';
import SkillEntity from '../skills/entities/skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobEntity, SkillEntity])],
  controllers: [JobsController],
  providers: [JobsService],
})
export default class JobsModule {}
