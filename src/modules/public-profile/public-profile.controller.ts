import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PublicProfileService } from './public-profile.service';
import { CreatePublicProfileDto } from './dto/create-public-profile.dto';
import { UpdatePublicProfileDto } from './dto/update-public-profile.dto';

@Controller('public-profile')
export class PublicProfileController {
  constructor(private readonly publicProfileService: PublicProfileService) {}

  @Post()
  create(@Body() createPublicProfileDto: CreatePublicProfileDto) {
    return this.publicProfileService.create(createPublicProfileDto);
  }

  @Get()
  findAll() {
    return this.publicProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicProfileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePublicProfileDto: UpdatePublicProfileDto) {
    return this.publicProfileService.update(+id, updatePublicProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicProfileService.remove(+id);
  }
}
