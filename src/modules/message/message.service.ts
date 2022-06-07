import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateMessageDto from './dto/create-message.dto';
import MessageEntity from './entities/message.entity';

@Injectable()
export default class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<MessageEntity> {
    try {
      const newMessage = new MessageEntity();
      const entity = Object.assign(newMessage, createMessageDto);

      const createdMessage = await this.messageRepository
        .createQueryBuilder()
        .insert()
        .values(entity)
        .execute();

      const message = await this.getChatMessageById(
        createdMessage.raw.insertId,
      );

      return message;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findAll(): Promise<MessageEntity[]> {
    try {
      const message = await this.messageRepository
        .createQueryBuilder('message')
        .leftJoinAndSelect('message.senderId', 'user')
        .leftJoinAndSelect('message.roomId', 'chat-contacts')
        .getMany();

      return message;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async getChatMessageById(id: number): Promise<MessageEntity> {
    try {
      const message = await this.messageRepository
        .createQueryBuilder('message')
        .leftJoinAndSelect('message.senderId', 'user')
        .leftJoinAndSelect('message.roomId', 'chat-contacts')
        .select('')
        .where('message.id = :id', { id })
        .getOne();

      return message;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findMessagesByRoomId(roomId: number): Promise<MessageEntity[]> {
    try {
      const message = await this.messageRepository
        .createQueryBuilder('message')
        .leftJoinAndSelect('message.senderId', 'user')
        .leftJoinAndSelect('message.roomId', 'chat-contacts')
        .where('message.roomId.id = :id', { id: roomId })
        .getMany();

      return message;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
