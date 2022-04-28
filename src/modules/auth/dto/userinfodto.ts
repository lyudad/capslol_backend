import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { HasCapitalLetter } from 'src/shared/validators/HasCapitalLetter.validator';
import { HasNumber } from 'src/shared/validators/HasNumber.validator';

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
<<<<<<< HEAD:src/modules/auth/dto/userinfodto.ts
  //! TODO need to validate on capital letter and one number
=======
  @HasNumber()
  @HasCapitalLetter()
>>>>>>> 6c2e2604b9c3868ea3d5269838535589a97eedff:src/modules/auth/dto/user-info.dto.ts
  password: string;
}
