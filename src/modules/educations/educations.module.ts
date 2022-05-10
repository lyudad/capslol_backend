import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import EducationsService from './educations.service';
import EducationsController from './educations.controller';
import EducationEntity from './entities/education.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EducationEntity])],
  controllers: [EducationsController],
  providers: [EducationsService],
})
export default class EducationsModule {}
