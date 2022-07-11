import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  UsePipes,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import PageOptionsDto from 'src/shared/DTOs/page-options.dto';
import PageDto from 'src/shared/DTOs/page.dto';
import PublicProfileService from './public-profile.service';
import CreatePublicProfileDto from './dto/create-public-profile.dto';
import UpdatePublicProfileDto from './dto/update-public-profile.dto';
import PublicProfile from './entities/public-profile.entity';
import SkillEntity from '../skills/entities/skill.entity';
import JWTGuard from '../auth/guards/jwt.guard';
import SearchQueryProfile from './dto/search.query';

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

  @Get('search')
  @UsePipes(new ValidationPipe())
  @UseGuards(JWTGuard)
  async search(
    @Query() searchQuery: SearchQueryProfile,
  ): Promise<PublicProfile[]> {
    const { q, category, skills } = searchQuery;
    const response = await this.publicProfileService.search(
      q,
      category,
      skills,
    );
    return response;
  }

  @Get('search-talens')
  @UsePipes(new ValidationPipe())
  @UseGuards(JWTGuard)
  async searchTalents(
    @Query()
    searchQuery: SearchQueryProfile,
  ): Promise<PageDto<PublicProfile>> {
    try {
      const response = await this.publicProfileService.searchTalents(
        searchQuery,
      );
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<PublicProfile>> {
    const profile = await this.publicProfileService.findAll(pageOptionsDto);
    return profile;
  }

  @Patch()
  @UsePipes(new ValidationPipe())
  @UseGuards(JWTGuard)
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
}
