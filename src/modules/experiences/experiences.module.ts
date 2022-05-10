import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ExperiencesService from './experiences.service';
import ExperiencesController from './experiences.controller';
import ExperienceEntity from './entities/experience.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExperienceEntity])],
  controllers: [ExperiencesController],
  providers: [ExperiencesService],
})
export default class ExperiencesModule {}
