import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export default class SearchByFreelancerQuery {
  @ApiProperty({
    description: 'contract identifier',
  })
  @IsNotEmpty()
  @IsNumberString()
  freelancerId?: number;
}
