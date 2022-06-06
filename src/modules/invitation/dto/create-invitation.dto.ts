import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export default class CreateInvitationDto {
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
}
