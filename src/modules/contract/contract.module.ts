import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ContractService from './contract.service';
import ContractController from './contract.controller';
import ContractEntity from './entities/contract.entity';
import OfferModule from '../offer/offer.module';

@Module({
  imports: [TypeOrmModule.forFeature([ContractEntity]), OfferModule],
  controllers: [ContractController],
  providers: [ContractService],
})
export default class ContractModule {}
