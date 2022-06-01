import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ChatContactsController from './chat-contacts.controller';
import ChatContactsService from './chat-contacts.service';
import ChatContactEntity from './entities/chat-contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatContactEntity])],
  controllers: [ChatContactsController],
  providers: [ChatContactsService],
})
export default class ChatContactsModule {}
