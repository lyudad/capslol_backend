import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsNumber } from 'class-validator';
import Status from '../types/ offer.type';
import CreateOfferDto from './create-offer.dto';

export default class UpdateStatusDto extends PartialType(CreateOfferDto) {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly id: number;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Status)
  status: Status;
}
