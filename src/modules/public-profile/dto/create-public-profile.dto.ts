import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
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
  profileImage: string;

  @IsNumber()
  @ApiProperty({
    description: 'Recommended hourly rate in dollars (number)',
  })
  hourRate: number;

  @ApiProperty({
    description: 'Ability to set aside time for daily work (number)',
  })
  @IsNumber()
  availableHours: number;

  @IsNumber()
  experienseId: number;

  @IsNumber()
  educationsId: number;

  @IsNumber()
  categoryId: number;

  @ApiProperty({
    description: 'Please indicate the desired position',
    example: 'Frontend Developer',
  })
  @IsString()
  position: string;

  @ApiProperty({
    description: 'Choose one of the level English',
    enum: English,
  })
  @IsEnum(English)
  english: English;

  @IsString()
  other: string;

  @IsArray()
  skills: [];
}
