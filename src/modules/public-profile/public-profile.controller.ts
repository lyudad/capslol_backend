import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import PublicProfileService from './public-profile.service';
import CreatePublicProfileDto from './dto/create-public-profile.dto';
import UpdatePublicProfileDto from './dto/update-public-profile.dto';

@ApiTags('Public Profile')
@Controller('profiles')
export default class PublicProfileController {
  constructor(private readonly publicProfileService: PublicProfileService) {}

  @Post()
  async create(@Body() dto: CreatePublicProfileDto) {
    const profile = await this.publicProfileService.create(dto);
    return profile;
  }

  @Get()
  async findAll() {
    const profile = await this.publicProfileService.findAll();
    return profile;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicProfileService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePublicProfileDto: UpdatePublicProfileDto,
  ) {
    return this.publicProfileService.update(+id, updatePublicProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicProfileService.remove(+id);
  }
}
