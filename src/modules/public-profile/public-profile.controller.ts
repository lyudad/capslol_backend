import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import PublicProfileService from './public-profile.service';
import CreatePublicProfileDto from './dto/create-public-profile.dto';
import UpdatePublicProfileDto from './dto/update-public-profile.dto';
import PublicProfile from './entities/public-profile.entity';
import SkillEntity from '../skills/entities/skill.entity';
import UpdateProfileImageDto from './dto/update-image.dto';

@ApiTags('Public Profile')
@Controller('profiles')
export default class PublicProfileController {
  constructor(private readonly publicProfileService: PublicProfileService) {}

  @Post()
  async create(@Body() dto: CreatePublicProfileDto): Promise<SkillEntity[]> {
    const profile = await this.publicProfileService.create(dto);
    return profile;
  }

  @Get('getById')
  findOne(@Query('user') id: number): Promise<PublicProfile> {
    return this.publicProfileService.findOne(id);
  }

  @Get()
  async findAll(): Promise<PublicProfile[]> {
    const profile = await this.publicProfileService.findAll();
    return profile;
  }

  @Patch()
  update(
    @Body() updatePublicProfileDto: UpdatePublicProfileDto,
  ): Promise<PublicProfile> {
    return this.publicProfileService.update(updatePublicProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<PublicProfile> {
    return this.publicProfileService.remove(id);
  }

  @Get('getByUserId/:id')
  async UserId(@Param('id') userId: number): Promise<PublicProfile> {
    const profile = await this.publicProfileService.getByUserId(userId);
    return profile;
  }

  @Put('update')
  async updateOwnerImage(
    @Query('id') id: number,
    @Body() updateProfileImageDto: UpdateProfileImageDto,
  ): Promise<PublicProfile> {
    try {
      const profile = await this.publicProfileService.updateOwnerPhoto(
        id,
        updateProfileImageDto,
      );
      return profile;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
