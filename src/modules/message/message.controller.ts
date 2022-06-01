import { Controller, Get, Query } from '@nestjs/common';
import MessageService from './message.service';

@Controller('messages')
export default class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('getByChatId')
  async getMessagesByChatID(@Query('chat') chatId: number) {
    const messages = await this.messageService.findMessagesByChatId(chatId);
    console.log(messages);
    return messages;
  }
}
