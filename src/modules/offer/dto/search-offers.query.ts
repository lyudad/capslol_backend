import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';
import PageOptionsDto from 'src/shared/DTOs/page-options.dto';

export default class SearchOffersQueryDto extends PageOptionsDto {
  @ApiProperty({
    description: 'offer identifier',
  })
  @IsOptional()
  @IsNumberString()
  freelancerId?: number;
}
