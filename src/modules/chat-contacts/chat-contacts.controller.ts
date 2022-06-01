import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import ChatContactsService from './chat-contacts.service';
import CreateChatContactDto from './dto/create-chat-contact.dto';
import UpdateChatContactDto from './dto/update-chat-contact.dto';

@Controller('chat-contacts')
export default class ChatContactsController {
  constructor(private readonly chatContactsService: ChatContactsService) {}

  @Post()
  create(@Body() createChatContactDto: CreateChatContactDto) {
    return this.chatContactsService.create(createChatContactDto);
  }

  @Get()
  findAll() {
    return this.chatContactsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.chatContactsService.findOne(+id);
  // }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChatContactDto: UpdateChatContactDto,
  ) {
    return this.chatContactsService.update(+id, updateChatContactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatContactsService.remove(+id);
  }
}
