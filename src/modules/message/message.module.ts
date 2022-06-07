import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import MessageService from './message.service';
import MessageGateway from './message.gateway';
import MessageEntity from './entities/message.entity';
import MessageController from './message.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity])],
  controllers: [MessageController],
  providers: [MessageGateway, MessageService],
})
export default class MessageModule {}
