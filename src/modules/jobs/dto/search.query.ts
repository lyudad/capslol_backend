import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';
import English from '../constants/request.constants';

export default class SearchQuery {
  @IsString()
  @IsOptional()
  readonly q?: string;

  @IsNumberString()
  @IsOptional()
  readonly category?: number;

  @IsNumberString()
  @IsOptional()
  readonly price?: number;

  @IsNumberString()
  @IsOptional()
  readonly timeAvailable?: number;

  @IsOptional()
  @IsEnum(English)
  languageLevel: English;

  @IsNumberString()
  @IsOptional()
  readonly skills?: string;
}
