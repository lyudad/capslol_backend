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
  company_name: string;

  @IsString()
  position: string;

  @IsString()
  start_at: string;

  @IsString()
  end_at: string;
}
