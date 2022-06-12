import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export default class CreateContractDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly offerId: number;
}
