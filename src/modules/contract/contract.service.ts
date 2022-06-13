import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../auth/types/user.interface';
import AuthServive from '../auth/auth.service';
import JobsService from '../jobs/jobs.service';
import OfferService from '../offer/offer.service';
import CreateContractDto from './dto/create-contract.dto';
import ContractEntity from './entities/contract.entity';
import ResponseMessage from './types/response.type';
import UpdateContractDto from './dto/update-contract.dto';

@Injectable()
export default class ContractService {
  constructor(
    @InjectRepository(ContractEntity)
    private readonly contractRepository: Repository<ContractEntity>,
    private readonly userService: AuthServive,
    private readonly jobService: JobsService,
    private readonly offerService: OfferService,
  ) {}

  async create(createContractDto: CreateContractDto): Promise<ContractEntity> {
    try {
      const { ownerId, freelancerId, jobId, offerId } = createContractDto;
      const owner = await this.userService.getUserById(ownerId);
      const freelancer = await this.userService.getUserById(freelancerId);
      const job = await this.jobService.findById(jobId);
      const offer = await this.offerService.findOfferById(offerId);

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
      if (!offer) {
        throw new HttpException(
          ResponseMessage.OFFER_NOT_FOUND,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      const contract = new ContractEntity();
      const newContract = Object.assign(contract, createContractDto);
      const rawResult = await this.contractRepository
        .createQueryBuilder('contract')
        .insert()
        .values(newContract)
        .execute();
      const createdContract = await this.findContractById(
        rawResult.identifiers[0].id,
      );
      return createdContract;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findContractById(id: number): Promise<ContractEntity> {
    try {
      const result = await this.contractRepository
        .createQueryBuilder('contract')
        .leftJoinAndSelect('contract.ownerId', 'owner')
        .leftJoinAndSelect('contract.freelancerId', 'freelancer')
        .leftJoinAndSelect('contract.jobId', 'job')
        .leftJoinAndSelect('contract.offerId', 'offer')
        .where('contract.id = :id', { id })
        .getOne();
      if (!result) {
        throw new HttpException(
          ResponseMessage.CONTRACT_NOT_FOUND,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findAll(): Promise<ContractEntity[]> {
    try {
      const result = await this.contractRepository
        .createQueryBuilder('contract')
        .leftJoinAndSelect('contract.ownerId', 'owner')
        .leftJoinAndSelect('contract.freelancerId', 'freelancer')
        .leftJoinAndSelect('contract.jobId', 'job')
        .leftJoinAndSelect('contract.offerId', 'offer')
        .getMany();
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findByFreelancer(id: number): Promise<ContractEntity[]> {
    try {
      const contracts = await this.contractRepository
        .createQueryBuilder('contract')
        .andWhere('freelancerId = :id', {
          id,
        })
        .leftJoinAndSelect('contract.ownerId', 'owner')
        .leftJoinAndSelect('contract.freelancerId', 'freelancer')
        .leftJoinAndSelect('contract.jobId', 'job')
        // .leftJoinAndSelect('contract.offerId', 'offer')
        .orderBy('contract.createdAt')
        .getMany();
      return contracts;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async updateContractStatus(
    updateContractStatusDto: UpdateContractDto,
  ): Promise<ContractEntity> {
    try {
      const { status, id, closedAt } = updateContractStatusDto;
      await this.contractRepository.update(id, { status, closedAt });
      const newContractStatus = await this.contractRepository.findOne(id);
      return newContractStatus;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
