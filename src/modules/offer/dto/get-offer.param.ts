import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export default class GetOfferParam {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  id: number;
}
