import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export default class SearchByOwnerQuery {
  @ApiProperty({
    description: 'contract identifier',
  })
  @IsNotEmpty()
  @IsNumberString()
  ownerId?: number;
}
