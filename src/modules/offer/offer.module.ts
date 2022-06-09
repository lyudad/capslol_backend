import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import OfferService from './offer.service';
import OfferController from './offer.controller';
import OfferEntity from './entities/offer.entity';
import AuthModule from '../auth/auth.module';
import JobsModule from '../jobs/jobs.module';

@Module({
  imports: [TypeOrmModule.forFeature([OfferEntity]), AuthModule, JobsModule],
  controllers: [OfferController],
  providers: [OfferService],
  exports: [OfferService],
})
export default class OfferModule {}
