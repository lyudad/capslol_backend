import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum English {
  NOENGLISH = 'No English',
  BEGINNER = 'Beginner',
  PREINTERMEDIATE = 'Pre-Intermediate',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
  NOSET = 'No set',
}

export default class CreatePublicProfileDto {
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    description: 'URL',
    example: 'https://assets.imgix.net/unsplash/transport.jpg',
  })
  @IsString()
  @IsOptional()
  profileImage?: string;

  @IsNumber()
  @ApiProperty({
    description: 'Recommended hourly rate in dollars (number)',
  })
  @IsOptional()
  hourRate: number;

  @ApiProperty({
    description: 'Ability to set aside time for daily work (number)',
  })
  @IsNumber()
  @IsOptional()
  availableHours: number;

  @IsArray()
  @IsOptional()
  experiense?: [];

  @IsArray()
  @IsOptional()
  educations?: [];

  @IsNumber()
  @IsOptional()
  categoryId: number;

  @ApiProperty({
    description: 'Please indicate the desired position',
    example: 'Frontend Developer',
  })
  @IsString()
  @IsOptional()
  position?: string;

  @ApiProperty({
    description: 'Choose one of the level English',
    enum: English,
  })
  @IsEnum(English)
  @IsOptional()
  english: English;

  @IsString()
  @IsOptional()
  other?: string;

  @IsArray()
  @IsOptional()
  skills: [];
}
