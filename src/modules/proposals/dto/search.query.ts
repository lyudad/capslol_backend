import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';
import PageOptionsDto from 'src/shared/DTOs/page-options.dto';

export default class SearchProposalQueryDto extends PageOptionsDto {
  @ApiProperty({
    description: 'proposal identifier',
  })
  @IsNumberString()
  @IsOptional()
  readonly freelancerId?: number;
}
