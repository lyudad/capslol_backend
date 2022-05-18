import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export default class CreateSkillDto {
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    description: 'Write your Stack',
    example: 'Development [Js, Java, Python]',
  })
  name: string;
}
