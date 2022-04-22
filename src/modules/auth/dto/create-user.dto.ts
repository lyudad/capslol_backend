import { ApiProperty } from '@nestjs/swagger';

export default class CreateUserDto {
  @ApiProperty({ example: 'neo', description: 'The One' })
  username: string;

  @ApiProperty({ example: 'thomas.anderson@matrix.com' })
  email: string

  @ApiProperty({ example: 'zion-20', description: 'password must contain at least one character one number' })
  password: string;

}
