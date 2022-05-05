import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateEducationDto {
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    description: 'Name of educational institution, company, courses',
    example: 'GoIT - school',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description:
      'Еhe name of the specialization from the educational institution',
    example: 'Mechanical engineer',
  })
  @IsString()
  specialization: string;

  @ApiProperty({
    description: 'Start date of training',
    example: '22.02.2020',
  })
  @IsString()
  startAt: string;

  @ApiProperty({
    description: 'Date of completion',
    example: '01.01.2021',
  })
  @IsString()
  endAt: string;
}
