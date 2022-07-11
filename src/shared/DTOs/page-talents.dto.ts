import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';
import InvitationEntity from 'src/modules/invitation/entities/invitation.entity';
import PageMetaDto from './page-meta.dto';

export default class PageDtoTalents<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @IsArray()
  @ApiProperty({ isArray: true })
  @IsOptional()
  readonly invatation: InvitationEntity[];

  @ApiProperty({ type: () => PageMetaDto })
  readonly meta: PageMetaDto;

  constructor(data: T[], invatation: InvitationEntity[], meta: PageMetaDto) {
    this.meta = meta;
    this.data = data;
    this.invatation = invatation;
  }
}
