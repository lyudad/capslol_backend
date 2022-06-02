import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsEnum } from 'class-validator';
import Status from '../types/ offer.type';
import CreateOfferDto from './create-offer.dto';

export default class UpdateOfferDto extends PartialType(CreateOfferDto) {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly ownerId: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly freelancerId: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly jobId: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly hourRate: number;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Status)
  readonly status: Status;
}
