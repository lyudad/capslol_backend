import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export default class ToggleQuery {
  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  readonly id: number;
}
