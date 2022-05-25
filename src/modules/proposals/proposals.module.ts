import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProposalEntity from './entities/proposal.entity';
import ProposalsController from './proposals.controller';
import ProposalsService from './proposals.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProposalEntity])],
  controllers: [ProposalsController],
  providers: [ProposalsService],
})
export default class ProposalsModule {}
