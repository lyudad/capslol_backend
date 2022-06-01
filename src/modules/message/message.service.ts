/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateMessageDto from './dto/create-message.dto';
import MessageEntity from './entities/message.entity';

@Injectable()
export default class MessageService {
  clientToUser = {};

  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    try {
      const newMessage = new MessageEntity();
      const entity = Object.assign(newMessage, createMessageDto);

      const createdMessage = await this.messageRepository
        .createQueryBuilder()
        .insert()
        .values(entity)
        .execute();

      const message = await this.getChatMessages(createdMessage.raw.insertId);
      console.log(createdMessage);
      return message;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findAll() {
    try {
      const message = await this.messageRepository
        .createQueryBuilder('message')
        .leftJoinAndSelect('message.senderId', 'user')
        .getMany();

      return message;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async getChatMessages(id: any) {
    try {
      const message = await this.messageRepository
        .createQueryBuilder('message')
        .leftJoinAndSelect('message.senderId', 'user')
        .select('')
        .where('message.id = :id', { id })
        .getOne();

      return message;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async join(roomId: number) {
    try {
      const roomMessages = await this.findMessagesByChatId(roomId);

      return roomMessages;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  getClientName(clientId: string) {
    return this.clientToUser[clientId];
  }

  async findMessagesByChatId(chatId: number) {
    try {
      const message = await this.messageRepository
        .createQueryBuilder('message')
        .leftJoinAndSelect('message.senderId', 'user')
        .select('')
        .where('message.roomId = :roomId', { roomId: chatId })
        .getMany();

      return message;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
