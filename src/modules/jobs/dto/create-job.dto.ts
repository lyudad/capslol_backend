import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import English from '../constants/request.constants';

export default class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  timeAvailable: number;

  @IsNumber()
  @IsNotEmpty()
  ownerId: number;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  skills: number[];

  @IsNotEmpty()
  @IsEnum(English)
  languageLevel: English;
}
