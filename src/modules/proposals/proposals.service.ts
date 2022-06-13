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

  async deleteProposal(proposalId: number): Promise<ProposalEntity> {
    try {
      await this.proposalRepository.delete(proposalId);
      return;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async searchByFreelancerId(freelancerId: number): Promise<ProposalEntity[]> {
    try {
      const proposals = await this.proposalRepository
        .createQueryBuilder('proposal')
        .leftJoinAndSelect('proposal.jobId', 'jobs')
        .leftJoinAndSelect('proposal.freelancerId', 'user')
        .orderBy('-proposal.createdAt')
        .andWhere('freelancerId = :id', {
          id: freelancerId,
        });

      return proposals.getMany();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
