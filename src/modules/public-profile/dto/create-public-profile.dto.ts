import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum English {
  NOENGLISH = 'No English',
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
}

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

  @ApiProperty({
    description: 'Please indicate the desired position',
    example: 'Frontend Developer',
  })
  @IsString()
  position: string;

  experiense_id: number;

  skill_id: number;

  @ApiProperty({
    description: 'Choose one of the level English',
    enum: English,
  })
  @IsEnum(English)
  english: English;

  @IsString()
  other: string;
}
