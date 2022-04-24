import { ApiProperty } from '@nestjs/swagger';

export default class UserInfoDto {
  @ApiProperty({
    required: false,
    description: 'username must be unique',
    example: '@neo',
  })
  username: string;

  @ApiProperty({
    description: 'email address',
    example: 'thomas.anderson@matrix.com',
  })
  email: string;

  @ApiProperty({
    description:
      'password must contain at least one character, one number and less 6 digits',
    example: 'zion-20',
  })
  password: string;
}
