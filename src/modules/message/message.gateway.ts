/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import MessageService from './message.service';
import CreateMessageDto from './dto/create-message.dto';

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
  async create(@MessageBody() createMessageDto: CreateMessageDto) {
    const message = await this.messageService.create(createMessageDto);

    this.server.emit('msgToClient', message);

    return message;
  }

  @SubscribeMessage('join_room')
  async joinRoom(@MessageBody() roomId: any) {
    const room = await this.messageService.join(roomId);

    // this.server.socketsJoin(room);
    return room;
  }

  @SubscribeMessage('typing')
  async typing(
    @MessageBody('isTyping') isTyping: boolean,
    @ConnectedSocket() client: Socket,
  ) {
    const clientName = await this.messageService.getClientName(client.id);

    client.broadcast.emit('typing', { clientName, isTyping });
  }

  @SubscribeMessage('findAllMessage')
  findAll() {
    return this.messageService.findAll();
  }

  afterInit() {
    this.logger.log(`Initialized...`);
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
