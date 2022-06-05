import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export default class SearchOffersQuery {
  @ApiProperty({
    description: 'offer identifier',
  })
  @IsNotEmpty()
  @IsNumberString()
  freelancerId?: number;
}
