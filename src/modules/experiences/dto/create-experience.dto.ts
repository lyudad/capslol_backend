import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateExperienceDto {
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    description: 'Write your Stack',
    example: 'Development [Js, Java, Python]',
  })
  @IsString()
  companyName: string;

  @IsString()
  position: string;

  @IsString()
  startAt: string;

  @IsString()
  endAt: string;
}
