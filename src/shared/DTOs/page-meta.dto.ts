import { ApiProperty } from '@nestjs/swagger';
import PageOptionsDto from './page-options.dto';

interface pageMetaInterface {
  itemCount: number;
  options: PageOptionsDto;
}

export default class PageMetaDto {
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly take: number;

  @ApiProperty()
  readonly itemCount: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor(pageMetaParams: pageMetaInterface) {
    this.page = pageMetaParams.options.page;
    this.take = pageMetaParams.options.take;
    this.itemCount = pageMetaParams.itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
