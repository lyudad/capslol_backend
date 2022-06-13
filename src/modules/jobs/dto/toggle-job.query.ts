import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export default class ToogleQuery {
  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  readonly id: number;
}
