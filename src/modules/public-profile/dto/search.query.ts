import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';
import PageOptionsDto from 'src/shared/DTOs/page-options.dto';

export enum English {
  BEGINNER = 'Beginner',
  PREINTERMEDIATE = 'Pre-Intermediate',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
  NOSET = 'No set',
}

export default class SearchQueryProfile extends PageOptionsDto {
  @ApiProperty({
    description: 'search queries',
    required: false,
    example: 'to be or not to be?',
  })
  @IsString()
  @IsOptional()
  readonly q: string;

  @ApiProperty({
    description: 'category identifier',
    required: false,
  })
  @IsNumberString()
  @IsOptional()
  readonly category: number;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsEnum(English)
  readonly languageLevel: English;

  @ApiProperty({
    required: false,
  })
  @IsNumberString()
  @IsOptional()
  readonly skills?: string;

  @IsString()
  @IsOptional()
  readonly user?: string;
}
