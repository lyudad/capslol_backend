/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateProposalDto from './dto/create-proposal.dto';
import ProposalEntity from './entities/proposal.entity';

@Injectable()
export default class ProposalsService {
  constructor(
    @InjectRepository(ProposalEntity)
    private readonly proposalRepository: Repository<ProposalEntity>,
  ) {}

  // eslint-disable-next-line consistent-return
  async createProposal(createProposalDto: CreateProposalDto): Promise<any> {
    try {
      const newProposal = new ProposalEntity();
      const entity = Object.assign(newProposal, createProposalDto);

      // if (!entity.jobId) {
      //   throw new HttpException('Invalid id', HttpStatus.UNPROCESSABLE_ENTITY);
      // }

      // const proposal = await this.proposalRepository.save(entity);

      const proposal = await this.proposalRepository
        .createQueryBuilder()
        .insert()
        .values(entity)
        .execute();

      return proposal;
    } catch (error) {
      // return new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async getAll(): Promise<any> {
    try {
      const proposals = await this.proposalRepository
        .createQueryBuilder('proposal')
        .leftJoinAndSelect('proposal.jobId', 'jobs')
        .getMany();

      return proposals;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async getSingleProposal(id: number): Promise<any> {
    try {
      const proposal = await this.proposalRepository
        .createQueryBuilder('proposal')
        .where('proposal.id = :id', { id })
        .getOne();

      return proposal;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async delete(id: number): Promise<any> {
    try {
      const proposal = await this.proposalRepository
        .createQueryBuilder()
        .delete()
        .where('id = :id', { id })
        .execute();

      return proposal;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
