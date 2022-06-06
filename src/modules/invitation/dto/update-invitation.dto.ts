import { PartialType } from '@nestjs/swagger';
import CreateInvitationDto from './create-invitation.dto';

export default class UpdateInvitationDto extends PartialType(
  CreateInvitationDto,
) {}
