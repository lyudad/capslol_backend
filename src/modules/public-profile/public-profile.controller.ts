import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
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

  @Get('getById')
  findOne(@Query('user') id: number) {
    return this.publicProfileService.findOne(id);
  }

  @Get()
  async findAll() {
    const profile = await this.publicProfileService.findAll();
    return profile;
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updatePublicProfileDto: UpdatePublicProfileDto,
  ) {
    return this.publicProfileService.update(id, updatePublicProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.publicProfileService.remove(id);
  }

  @Get('getByUserId/:id')
  async UserId(@Param('id') userId: number) {
    const profile = await this.publicProfileService.getByUserId(userId);
    return profile;
  }
}
