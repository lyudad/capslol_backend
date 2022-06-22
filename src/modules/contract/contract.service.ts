import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    private readonly offerService: OfferService,
  ) {}

  async create(createContractDto: CreateContractDto): Promise<ContractEntity> {
    try {
      const { offerId } = createContractDto;
      const offer = await this.offerService.findOfferById(offerId);

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
        .leftJoinAndSelect('contract.offerId', 'offer')
        .leftJoinAndSelect('offer.jobId', 'job')
        .leftJoinAndSelect('offer.ownerId', 'owner')
        .leftJoinAndSelect('offer.freelancerId', 'freelancer')
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
        .leftJoinAndSelect('contract.offerId', 'offer')
        .leftJoinAndSelect('offer.jobId', 'job')
        .leftJoinAndSelect('offer.ownerId', 'owner')
        .leftJoinAndSelect('offer.freelancerId', 'freelancer')
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
        .leftJoinAndSelect('contract.offerId', 'offer')
        .leftJoinAndSelect('offer.jobId', 'job')
        .leftJoinAndSelect('offer.ownerId', 'owner')
        .leftJoinAndSelect('offer.freelancerId', 'freelancer')
        .orderBy('-contract.createdAt')
        .andWhere('freelancerId = :id', {
          id,
        })
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

  async findByOfferId(id: number): Promise<ContractEntity> {
    try {
      const contracts = await this.contractRepository
        .createQueryBuilder('contract')
        .leftJoinAndSelect('contract.offerId', 'offer')
        .leftJoinAndSelect('offer.jobId', 'job')
        .leftJoinAndSelect('offer.ownerId', 'owner')
        .leftJoinAndSelect('offer.freelancerId', 'freelancer')
        .orderBy('-contract.createdAt')
        .andWhere('offerId = :id', {
          id,
        })
        .getOne();
      return contracts;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
