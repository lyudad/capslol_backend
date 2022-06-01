import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import ChatContactsService from './chat-contacts.service';
import CreateChatContactDto from './dto/create-chat-contact.dto';
import ChatContactEntity from './entities/chat-contact.entity';

@ApiTags('chat-contacts')
@Controller('chat-contacts')
export default class ChatContactsController {
  constructor(private readonly chatContactsService: ChatContactsService) {}

  @ApiBody({
    type: CreateChatContactDto,
  })
  @Post()
  @UsePipes(new ValidationPipe())
  async create(
    @Body() createChatContactDto: CreateChatContactDto,
  ): Promise<ChatContactEntity> {
    try {
      const chatContact = await this.chatContactsService.create(
        createChatContactDto,
      );

      return chatContact;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiResponse({
    type: ChatContactEntity,
  })
  @Get()
  async findAll(): Promise<ChatContactEntity[]> {
    try {
      const chatContacts = await this.chatContactsService.findAll();

      return chatContacts;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
