import { Module } from '@nestjs/common';
import { EducationsService } from './educations.service';
import { EducationsController } from './educations.controller';

@Module({
  controllers: [EducationsController],
  providers: [EducationsService]
})
export class EducationsModule {}
