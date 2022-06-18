import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import AuthServive from '../auth/auth.service';
import { Role } from '../auth/types/user.interface';
import JobsService from '../jobs/jobs.service';
import CreateOfferDto from './dto/create-offer.dto';

import UpdateStatusDto from './dto/update-status.dto';
import OfferEntity from './entities/offer.entity';
import ResponseMessage from './types/response.type';

@Injectable()
export default class OfferService {
  constructor(
    @InjectRepository(OfferEntity)
    private readonly offerRepository: Repository<OfferEntity>,
    private readonly userRepostitory: AuthServive,
    private readonly jobRepository: JobsService,
  ) {}

  async create(createOfferDto: CreateOfferDto): Promise<OfferEntity> {
    try {
      const { ownerId, freelancerId, jobId } = createOfferDto;
      const owner = await this.userRepostitory.getUserById(ownerId);
      const freelancer = await this.userRepostitory.getUserById(freelancerId);
      const job = await this.jobRepository.findById(jobId);

      if (!owner) {
        throw new HttpException(
          ResponseMessage.OWNER_NOT_FOUND,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      if (!freelancer) {
        throw new HttpException(
          ResponseMessage.FREELANCER_NOT_FOUND,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      if (owner.role !== Role.JOB_OWNER) {
        throw new HttpException(
          ResponseMessage.OWNER_HAS_INVALID_ROLE,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      if (freelancer.role !== Role.FREELANCER) {
        throw new HttpException(
          ResponseMessage.FREELANCER_HAS_INVALID_ROLE,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      if (!job) {
        throw new HttpException(
          ResponseMessage.JOB_NOT_FOUND,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      const offer = new OfferEntity();
      const newOffer = Object.assign(offer, createOfferDto);
      const rawResult = await this.offerRepository
        .createQueryBuilder()
        .insert()
        .values(newOffer)
        .execute();
      const createdOffer = await this.findOfferById(
        rawResult.identifiers[0].id,
      );
      return createdOffer;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findOfferById(id: number): Promise<OfferEntity> {
    try {
      const result = await this.offerRepository
        .createQueryBuilder('offer')
        .leftJoinAndSelect('offer.ownerId', 'owner')
        .leftJoinAndSelect('offer.freelancerId', 'freelancer')
        .leftJoinAndSelect('offer.jobId', 'job')
        .where('offer.id = :id', { id })
        .getOne();

      if (!result) {
        throw new HttpException(
          ResponseMessage.OFFER_NOT_EXISTS,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findAll(): Promise<OfferEntity[]> {
    try {
      const result = await this.offerRepository
        .createQueryBuilder('offer')
        .leftJoinAndSelect('offer.ownerId', 'owner')
        .leftJoinAndSelect('offer.freelancerId', 'freelancer')
        .leftJoinAndSelect('offer.jobId', 'job')
        .getMany();
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findByUserId(id: number): Promise<OfferEntity[]> {
    try {
      const offers = await this.offerRepository
        .createQueryBuilder('offer')
        .leftJoinAndSelect('offer.ownerId', 'owner')
        .leftJoinAndSelect('offer.freelancerId', 'freelancer')
        .leftJoinAndSelect('offer.jobId', 'job')
        .orderBy('-offer.createdAt')
        .andWhere('freelancerId = :id', {
          id,
        })
        .getMany();
      return offers;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async updateStatus(updateStatusDto: UpdateStatusDto): Promise<OfferEntity> {
    try {
      const { id, status } = updateStatusDto;
      await this.offerRepository.update(id, { status });
      const newOfferStatus = await this.offerRepository.findOne(id);
      return newOfferStatus;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findByJobId(jobId: number): Promise<OfferEntity> {
    try {
      const offer = await this.offerRepository
        .createQueryBuilder('offer')
        .leftJoinAndSelect('offer.ownerId', 'owner')
        .leftJoinAndSelect('offer.freelancerId', 'freelancer')
        .leftJoinAndSelect('offer.jobId', 'job')
        .orderBy('-offer.createdAt')
        .andWhere('jobId = :id', {
          id: jobId,
        })
        .getOne();

      return offer;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
