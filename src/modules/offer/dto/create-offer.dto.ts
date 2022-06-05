import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import Status from '../types/ offer.type';

export default class CreateOfferDto {
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
  readonly hourRate: number;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Status)
  readonly status: Status;
}
