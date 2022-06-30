import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';
import PageOptionsDto from 'src/shared/DTOs/page-options.dto';
import { English } from '../types/entity.types';

export default class SearchQueryDto extends PageOptionsDto {
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
  @IsNumberString()
  @IsOptional()
  readonly price: number;

  @ApiProperty({
    required: false,
  })
  @IsNumberString()
  @IsOptional()
  readonly timeAvailable: number;

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

  @ApiProperty({
    required: false,
  })
  @IsNumberString()
  @IsOptional()
  readonly ownerId?: number;

  @ApiProperty({
    required: false,
  })
  @IsNumberString()
  @IsOptional()
  readonly isArchived?: number;

  // TODO add projectDuration filter isArchived
}
