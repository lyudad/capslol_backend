import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export default class ForgotPasswordDto {
  @ApiProperty({
    description: 'Email address',
    example: 'thomas.anderson@matrix.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
