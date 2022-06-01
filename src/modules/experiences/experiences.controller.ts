import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';
import ExperiencesService from './experiences.service';
import CreateExperienceDto from './dto/create-experience.dto';
import UpdateExperienceDto from './dto/update-experience.dto';
import ExperienceEntity from './entities/experience.entity';

@ApiTags('Experiences')
@Controller('experiences')
export default class ExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) {}

  @Post()
  async create(@Body() dto: CreateExperienceDto): Promise<ExperienceEntity> {
    const category = await this.experiencesService.create(dto);
    return category;
  }

  @Get()
  findAll(): Promise<ExperienceEntity[]> {
    return this.experiencesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<ExperienceEntity> {
    return this.experiencesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateExperienceDto: UpdateExperienceDto,
  ): Promise<UpdateResult> {
    return this.experiencesService.update(id, updateExperienceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.experiencesService.remove(id);
  }
}
