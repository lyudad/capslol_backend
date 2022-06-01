import { PartialType } from '@nestjs/swagger';
import CreateChatContactDto from './create-chat-contact.dto';

export default class UpdateChatContactDto extends PartialType(
  CreateChatContactDto,
) {}
