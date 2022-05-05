import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum English {
  NOENGLISH = 'No English',
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
}

export default class CreatePublicProfileDto {
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    description: 'URL',
    example: 'https://assets.imgix.net/unsplash/transport.jpg',
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

  // experiense_id: number;

  @ApiProperty({
    description: 'Choose one of the level English',
    enum: English,
  })
  @IsEnum(English)
  english: English;

  @IsString()
  other: string;
}
