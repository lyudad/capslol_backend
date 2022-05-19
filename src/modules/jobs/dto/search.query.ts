import { IsNumberString, IsOptional, IsString } from 'class-validator';

export default class SearchQuery {
  @IsString()
  @IsOptional()
  readonly q?: string;

  @IsNumberString()
  @IsOptional()
  readonly category?: number;

  @IsNumberString()
  @IsOptional()
  readonly skills?: string;
}
