import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import AuthServive from '../auth/auth.service';
import { Role } from '../auth/types/user.interface';
import JobsService from '../jobs/jobs.service';
import CreateInvitationDto from './dto/create-invitation.dto';
import InvitationEntity from './entities/invitation.entity';
import ResponseMessage from './types/response.type';

@Injectable()
export default class InvitationService {
  constructor(
    @InjectRepository(InvitationEntity)
    private readonly invitationRepository: Repository<InvitationEntity>,
    private readonly jobService: JobsService,
    private readonly userService: AuthServive,
  ) {}

  async create(
    createInvitationDto: CreateInvitationDto,
  ): Promise<InvitationEntity> {
    try {
      const { ownerId, freelancerId, jobId } = createInvitationDto;
      const owner = await this.userService.getUserById(ownerId);
      const freelancer = await this.userService.getUserById(freelancerId);
      const job = await this.jobService.findById(jobId);

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

      const invitation = new InvitationEntity();
      const newInvitation = Object.assign(invitation, createInvitationDto);
      const rawResult = await this.invitationRepository
        .createQueryBuilder()
        .insert()
        .values(newInvitation)
        .execute();
      const createdOffer = await this.findById(rawResult.identifiers[0].id);
      return createdOffer;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findById(id: number): Promise<InvitationEntity> {
    try {
      const result = await this.invitationRepository
        .createQueryBuilder('invitation')
        .leftJoinAndSelect('invitation.ownerId', 'owner')
        .leftJoinAndSelect('invitation.freelancerId', 'freelancer')
        .leftJoinAndSelect('invitation.jobId', 'job')
        .where('invitation.id = :id', { id })
        .getOne();

      if (!result) {
        throw new HttpException(
          ResponseMessage.INVITATION_NOT_EXISTS,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findAll(): Promise<InvitationEntity[]> {
    try {
      const result = await this.invitationRepository
        .createQueryBuilder('invitation')
        .leftJoinAndSelect('invitation.ownerId', 'owner')
        .leftJoinAndSelect('invitation.freelancerId', 'freelancer')
        .leftJoinAndSelect('invitation.jobId', 'job')
        .getMany();
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findByFreelancer(id: number): Promise<InvitationEntity[]> {
    try {
      const invitations = await this.invitationRepository
        .createQueryBuilder('invitation')
        .leftJoinAndSelect('invitation.ownerId', 'owner')
        .leftJoinAndSelect('invitation.freelancerId', 'freelancer')
        .leftJoinAndSelect('invitation.jobId', 'job')
        .orderBy('invitation.createdAt')
        .andWhere('freelancerId = :id', {
          id,
        })
        .getMany();
      return invitations;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
