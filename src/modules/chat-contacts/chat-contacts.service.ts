/* eslint-disable @typescript-eslint/no-explicit-any */
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

  async getChatContactByJobId(
    jobId: number,
    freelancerId: number,
  ): Promise<any> {
    try {
      let chatContact = await this.repository
        .createQueryBuilder('contacts')
        .leftJoinAndSelect('contacts.proposalId', 'proposals')
        .leftJoinAndSelect('proposals.freelancerId', 'users')
        .leftJoinAndSelect('proposals.jobId', 'jobs')
        .leftJoinAndSelect('jobs.ownerId', 'user');
      // .where('contacts.proposalId.jobId.id =:id', { id: jobId })
      // .andWhere({ 'users.id': freelancerId });
      // .orderBy('-contacts.createdAt');

      if (jobId) {
        chatContact = chatContact.andWhere('jobId = :id', {
          id: jobId,
        });
      }

      if (freelancerId) {
        chatContact = chatContact.andWhere('freelancerId = :id', {
          id: freelancerId,
        });
      }
      console.log(chatContact);
      return chatContact.getOne();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
