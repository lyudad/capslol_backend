import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export default class GetJobQuery {
  @ApiProperty({
    description: 'job identifier',
  })
  @IsNotEmpty()
  @IsNumberString()
  jobId: number;
}
