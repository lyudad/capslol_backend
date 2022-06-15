import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export default class SearchContractsQuery {
  @ApiProperty({
    description: 'contract identifier',
  })
  @IsNotEmpty()
  @IsNumberString()
  freelancerId?: number;
}
