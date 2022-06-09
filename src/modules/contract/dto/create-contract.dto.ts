import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsEnum } from 'class-validator';
import Status from 'src/modules/offer/types/ offer.type';

export default class CreateContractDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly ownerId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly freelancerId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly jobId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly offerId: number;
}
