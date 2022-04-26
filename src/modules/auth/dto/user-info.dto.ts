import { ApiProperty } from '@nestjs/swagger';

export default class UserInfoDto {
  @ApiProperty({
    description: 'Fist name ',
    example: 'Thomas',
  })
  firstName: string;

  @ApiProperty({
    description: 'Fast name',
    example: 'Anderson',
  })
  lastName: string;

  @ApiProperty({
    description: 'email address',
    example: 'thomas.anderson@matrix.com',
  })
  email: string;

  @ApiProperty({
    description:
      'must contain at least one capital letter, one number and length must be minimum 8 symbols, and we must show the hint about password parameters',
    example: 'The-One',
  })
  password: string;
}
