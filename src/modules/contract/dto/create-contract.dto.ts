import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsEnum,
  IsString,
} from 'class-validator';
import ContractStatus from '../types/contract.type';

export default class CreateContractDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  id: number;

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

  @ApiProperty()
  @IsOptional()
  @IsEnum(ContractStatus)
  status: ContractStatus;

  @ApiProperty()
  @IsOptional()
  @IsString()
  closedAt: string | null;
}
