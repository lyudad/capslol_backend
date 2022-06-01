import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import MessageService from './message.service';
import CreateMessageDto from './dto/create-message.dto';
import MessageEntity from './entities/message.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export default class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('MessageGateway');

  constructor(private readonly messageService: MessageService) {}

  @SubscribeMessage('msgToServer')
  async create(
    @MessageBody() createMessageDto: CreateMessageDto,
  ): Promise<MessageEntity> {
    try {
      const message = await this.messageService.create(createMessageDto);

      this.server.emit('msgToClient', message);

      return message;
    } catch (error) {
      throw new WsException(error.message);
    }
  }

  @SubscribeMessage('join_room')
  async joinRoom(@MessageBody() roomId: number): Promise<MessageEntity[]> {
    try {
      const roomMessages = await this.messageService.findMessagesByRoomId(
        roomId,
      );

      return roomMessages;
    } catch (error) {
      throw new WsException(error.message);
    }
  }

  @SubscribeMessage('findAllMessages')
  async findAll(): Promise<MessageEntity[]> {
    try {
      const allMessages = await this.messageService.findAll();

      return allMessages;
    } catch (error) {
      throw new WsException(error.message);
    }
  }

  afterInit(): void {
    this.logger.log(`Initialized...`);
  }

  handleConnection(client: Socket): void {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket): void {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
