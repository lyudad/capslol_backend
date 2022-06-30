import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export default class SearchInvitationsQueryOwner {
  @ApiProperty({
    description: 'offer identifier',
  })
  @IsNotEmpty()
  @IsNumberString()
  ownerId?: number;
}
