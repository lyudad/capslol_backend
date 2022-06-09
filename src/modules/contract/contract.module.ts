import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ContractService from './contract.service';
import ContractController from './contract.controller';
import ContractEntity from './entities/contract.entity';
import JobsModule from '../jobs/jobs.module';
import AuthModule from '../auth/auth.module';
import OfferModule from '../offer/offer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContractEntity]),
    JobsModule,
    AuthModule,
    OfferModule,
  ],
  controllers: [ContractController],
  providers: [ContractService],
})
export default class ContractModule {}
