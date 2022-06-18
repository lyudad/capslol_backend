import { ApiProperty } from '@nestjs/swagger';
import PageOptionsDto from './page-options.dto';

interface pageMetaInterface {
  itemCount: number;
  options: PageOptionsDto;
}

export default class PageMetaDto {
  @ApiProperty()
  readonly page: number = 1;

  @ApiProperty()
  readonly take: number = 10;

  @ApiProperty()
  readonly itemCount: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor(pageMetaParams: pageMetaInterface) {
    this.page = Number(pageMetaParams.options.page) || this.page;
    this.take = Number(pageMetaParams.options.take) || this.take;
    this.itemCount = pageMetaParams.itemCount;
    this.pageCount = Math.floor(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
    Number();
  }
}
