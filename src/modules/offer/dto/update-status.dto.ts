import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import Status from '../types/ offer.type';
import CreateOfferDto from './create-offer.dto';

export default class UpdateStatusDto extends PartialType(CreateOfferDto) {
  @ApiProperty()
  @IsOptional()
  @IsEnum(Status)
  readonly status: Status;
}
