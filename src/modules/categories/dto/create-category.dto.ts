import { IsNotEmpty, IsString } from 'class-validator';

export default class CreateCategoryDto {
  @IsNotEmpty()
  id: number;

  @IsString()
  categoryТame: string;
}
