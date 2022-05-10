import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { HasCapitalLetter } from 'src/shared/validators/HasCapitalLetter.validator';
import { HasNumber } from 'src/shared/validators/HasNumber.validator';

enum Role {
  FREELANCER = 'Freelancer',
  JOBOWNER = 'Job Owner',
  NOSET = 'No set',
}

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
    description: 'Choose one of the role',
    enum: Role,
  })
  @IsEnum(Role)
  role: Role;

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
