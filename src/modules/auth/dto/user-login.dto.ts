import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { HasCapitalLetter } from 'src/shared/validators/HasCapitalLetter.validator';
import { HasNumber } from 'src/shared/validators/HasNumber.validator';

export default class UserLoginDto {
  @ApiProperty({
    description: 'email address',
    example: 'thomas.anderson@matrix.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'must contain at least one capital letter, one number and length must be minimum 8 symbols, and we must show the hint about password parameters',
    example: 'The-One',
  })
  @IsNotEmpty()
  @MinLength(8)
  @HasNumber()
  @HasCapitalLetter()
  password: string;
}
