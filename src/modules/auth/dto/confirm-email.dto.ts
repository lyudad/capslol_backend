import { IsString, IsNotEmpty } from 'class-validator';

export default class ConfirmEmailDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}
