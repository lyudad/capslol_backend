import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateChatContactDto from './dto/create-chat-contact.dto';
import ChatContactEntity from './entities/chat-contact.entity';

@Injectable()
export default class ChatContactsService {
  constructor(
    @InjectRepository(ChatContactEntity)
    private readonly repository: Repository<ChatContactEntity>,
  ) {}

  async create(
    createChatContactDto: CreateChatContactDto,
  ): Promise<ChatContactEntity> {
    try {
      const newChatContact = new ChatContactEntity();
      const entity = Object.assign(newChatContact, createChatContactDto);

      const createdChatContact = await this.repository
        .createQueryBuilder()
        .insert()
        .values(entity)
        .execute();

      const chatContact = await this.getChatContactById(
        createdChatContact.raw.insertId,
      );

      return chatContact;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findAll(): Promise<ChatContactEntity[]> {
    try {
      const chatContacts = await this.repository
        .createQueryBuilder('contacts')
        .leftJoinAndSelect('contacts.proposalId', 'proposals')
        .leftJoinAndSelect('proposals.freelancerId', 'users')
        .leftJoinAndSelect('proposals.jobId', 'jobs')
        .leftJoinAndSelect('jobs.ownerId', 'user')
        .orderBy('-contacts.createdAt')
        .getMany();

      return chatContacts;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async getChatContactById(id: number): Promise<ChatContactEntity> {
    try {
      const chatContact = await this.repository
        .createQueryBuilder('contacts')
        .select('')
        .where('contacts.id = :id', { id })
        .getOne();

      return chatContact;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async getChatContactByFreelancerId(id: number): Promise<ChatContactEntity> {
    try {
      const chatContact = await this.repository
        .createQueryBuilder('contacts')
        .leftJoinAndSelect('contacts.proposalId', 'proposals')
        .leftJoinAndSelect('proposals.freelancerId', 'users')
        .leftJoinAndSelect('proposals.jobId', 'jobs')
        .leftJoinAndSelect('jobs.ownerId', 'user')
        .where('freelancerId =:id', { id })
        .orderBy('-contacts.createdAt')
        .getOne();

      return chatContact;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async getChatContactByJobId(
    jobId: number,
    freelancerId: number,
  ): Promise<ChatContactEntity> {
    try {
      let chatContact = await this.repository
        .createQueryBuilder('contacts')
        .leftJoinAndSelect('contacts.proposalId', 'proposals')
        .leftJoinAndSelect('proposals.freelancerId', 'users')
        .leftJoinAndSelect('proposals.jobId', 'jobs')
        .leftJoinAndSelect('jobs.ownerId', 'user')
        .where('jobId =:id', { id: jobId })
        .getOne();

      chatContact = await this.getChatContactByFreelancerId(freelancerId);

      return chatContact;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
