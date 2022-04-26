import { ApiProperty } from '@nestjs/swagger';
import {
  Contains,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export default class UserInfoDto {
  @ApiProperty({
    description: 'Fist name ',
    example: 'Thomas',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'Fast name',
    example: 'Anderson',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

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
  //!TODO need to validate on capital letter and one number
  password: string;
}
