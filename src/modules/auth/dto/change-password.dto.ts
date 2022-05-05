import { IsNotEmpty, MinLength } from 'class-validator';
import { HasNumber } from 'src/shared/validators/HasNumber.validator';
import { HasCapitalLetter } from 'src/shared/validators/HasCapitalLetter.validator';
import { ApiProperty } from '@nestjs/swagger';

export default class ChangePasswordDto {
  @ApiProperty({
    description:
      'Must contain at least one capital letter, one number and length must be minimum 8 symbols, and we must show the hint about password parameters',
    example: 'The-One',
  })
  @IsNotEmpty()
  @MinLength(8)
  @HasNumber()
  @HasCapitalLetter()
  password: string;
}
