﻿import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { categories } from '../../seeding/mocks.dataset';
import CreateProposalDto from './dto/create-proposal.dto';
import ProposalEntity from './entities/proposal.entity';

@Injectable()
export default class ProposalsService {
  constructor(
    @InjectRepository(ProposalEntity)
    private readonly proposalRepository: Repository<ProposalEntity>,
  ) {}

  async createProposal(
    createProposalDto: CreateProposalDto,
  ): Promise<ProposalEntity> {
    try {
      const newProposal = new ProposalEntity();
      const entity = Object.assign(newProposal, createProposalDto);

      const createdProposal = await this.proposalRepository
        .createQueryBuilder()
        .insert()
        .values(entity)
        .execute();

      const proposal = await this.getProposalById(createdProposal.raw.insertId);

      return proposal;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async getAll(): Promise<ProposalEntity[]> {
    try {
      const proposals = await this.proposalRepository
        .createQueryBuilder('proposal')
        .leftJoinAndSelect('proposal.jobId', 'jobs')
        .leftJoinAndSelect('proposal.freelancerId', 'user')
        .getMany();

      return proposals;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async getProposalById(id: number): Promise<ProposalEntity> {
    try {
      const proposal = await this.proposalRepository
        .createQueryBuilder('proposal')
        .select('')
        .where('proposal.id = :id', { id })
        .getOne();

      return proposal;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async getOne(id: number): Promise<ProposalEntity> {
    try {
      const proposal = await this.proposalRepository
        .createQueryBuilder('proposal')
        .leftJoinAndSelect('proposal.jobId', 'jobs')
        .leftJoinAndSelect('proposal.freelancerId', 'user')
        .where('proposal.id = :id', { id })
        .getOne();

      return proposal;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async deleteProposal(proposalId: number) {
    try {
      return await this.proposalRepository.delete(proposalId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async searchByFreelancerId(freelancerId: number) {
    try {
      let proposals = await this.proposalRepository
        .createQueryBuilder('proposal')
        .leftJoinAndSelect('proposal.jobId', 'jobs')
        .leftJoinAndSelect('proposal.freelancerId', 'user')
        // .leftJoinAndSelect('proposal.jobOwner', 'jobs.ownerId')
        .orderBy('proposal.createdAt');

      if (freelancerId) {
        proposals = proposals.andWhere('freelancerId = :id', {
          id: freelancerId,
        });
      }

      return proposals.getMany();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
