import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { English, ProjectDuration } from '../types/entity.types';

export default class CreateJobDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly timeAvailable: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly ownerId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly categoryId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  readonly skills: number[];

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(ProjectDuration)
  readonly projectDuration: ProjectDuration;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(English)
  readonly languageLevel: English;
}
