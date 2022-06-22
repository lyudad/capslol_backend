import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export default class SearchByFreelancer {
  @ApiProperty({
    description: 'contract identifier',
  })
  @IsNotEmpty()
  @IsNumberString()
  freelancerId?: number;
}
