import { PartialType } from '@nestjs/mapped-types';
import CreateMessageDto from './create-message.dto';

export default class UpdateMessageDto extends PartialType(CreateMessageDto) {
  id: number;
}