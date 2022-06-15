import { IsNumberString, IsOptional } from 'class-validator';

export default class SearchByOwnerQuery {
  @IsNumberString()
  @IsOptional()
  readonly ownerId?: number;
}
