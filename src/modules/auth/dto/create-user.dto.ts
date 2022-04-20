import { ApiProperty } from '@nestjs/swagger';

export default class CreateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
