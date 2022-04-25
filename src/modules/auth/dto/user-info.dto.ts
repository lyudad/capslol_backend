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
      'password must contain at least one character, one number and less 6 digits',
    example: 'The-One',
  })
  password: string;
}
