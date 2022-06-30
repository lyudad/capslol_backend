import PageMetaDto from 'src/shared/DTOs/page-meta.dto';
import PageOptionsDto from 'src/shared/DTOs/page-options.dto';
import PageDto from 'src/shared/DTOs/page.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateProposalDto from './dto/create-proposal.dto';
import ProposalEntity from './entities/proposal.entity';
import SearchProposalQueryDto from './dto/search.query';

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

  async getAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<ProposalEntity>> {
    try {
      const pagination = new PageOptionsDto();
      Object.assign(pagination, pageOptionsDto);

      const qb = await this.proposalRepository
        .createQueryBuilder('proposal')
        .leftJoinAndSelect('proposal.jobId', 'jobs')
        .leftJoinAndSelect('proposal.freelancerId', 'user')
        .orderBy('proposal.createdAt', pagination.order);

      const totalCount = await qb.getCount();
      const proposals = await qb
        .skip(pagination.skip)
        .take(pagination.take)
        .getMany();

      const meta = new PageMetaDto({
        itemCount: totalCount,
        options: pagination,
      });

      return new PageDto(proposals, meta);
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

  async findFilteredAllProposals(
    searchByUserDto: SearchProposalQueryDto,
  ): Promise<PageDto<ProposalEntity>> {
    try {
      const pagination = new PageOptionsDto();
      Object.assign(pagination, searchByUserDto);

      let result = await this.proposalRepository
        .createQueryBuilder('proposal')
        .leftJoinAndSelect('proposal.jobId', 'jobs')
        .leftJoinAndSelect('proposal.freelancerId', 'user')
        .orderBy('', pagination.order)
        .orderBy('proposal.createdAt', 'DESC');

      if (searchByUserDto.freelancerId) {
        result = result.andWhere('freelancerId = :id', {
          id: searchByUserDto.freelancerId,
        });
      }

      const proposals = await result
        .skip(pagination.skip)
        .take(pagination.take)
        .getMany();

      const totalCount = await result.getCount();

      const meta = new PageMetaDto({
        itemCount: totalCount,
        options: pagination,
      });

      return new PageDto(proposals, meta);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
