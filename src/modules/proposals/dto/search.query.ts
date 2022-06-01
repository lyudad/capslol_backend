import { IsNumberString, IsOptional } from 'class-validator';

export default class SearchQuery {
  @IsNumberString()
  @IsOptional()
  readonly freelancerId?: number;
}
