import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import SkillsService from './skills.service';
import SkillsController from './skills.controller';
import SkillEntity from './entities/skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SkillEntity])],
  controllers: [SkillsController],
  providers: [SkillsService],
  exports: [SkillsService],
})
export default class SkillsModule {}
