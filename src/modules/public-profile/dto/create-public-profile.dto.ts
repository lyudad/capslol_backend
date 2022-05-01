import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CreatePublicProfileDto {
  user_id: number;

  @ApiProperty({
    description: 'URL',
    example: 'https://images.pexels.com',
  })
  @IsString()
  profile_image: string;

  @IsNumber()
  @ApiProperty({
    description: 'Recommended hourly rate in dollars (number)',
  })
  hour_rate: number;

  @ApiProperty({
    description: 'Ability to set aside time for daily work (number)',
  })
  @IsNumber()
  available_hours: number;

  education_id: number;

  category_id: number;

  @IsString()
  position: string;

  experiense_id: number;

  skill_id: number;

  language_id: number;

  @IsString()
  other: string;
}
