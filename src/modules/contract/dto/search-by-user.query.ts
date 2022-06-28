import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';
import PageOptionsDto from 'src/shared/DTOs/page-options.dto';

export default class SearchByUserDto extends PageOptionsDto {
  @ApiProperty({
    description: 'contract identifier',
  })
  @IsOptional()
  @IsNumberString()
  readonly freelancerId: number;

  @ApiProperty({
    description: 'contract identifier',
  })
  @IsOptional()
  @IsNumberString()
  readonly ownerId: number;
}
