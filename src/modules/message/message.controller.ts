import {
  Controller,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
  Get,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import MessageEntity from './entities/message.entity';
import MessageService from './message.service';

@ApiTags('Messages')
@Controller('messages')
export default class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @ApiResponse({
    type: MessageEntity,
  })
  @Get()
  @UsePipes(new ValidationPipe())
  async findByRoom(@Query('room') room: number): Promise<MessageEntity[]> {
    try {
      const payload = await this.messageService.findMessagesByRoomId(room);
      return payload;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
