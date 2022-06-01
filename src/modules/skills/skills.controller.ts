import { DeleteResult, UpdateResult } from 'typeorm';
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
import SkillsService from './skills.service';
import CreateSkillDto from './dto/create-skill.dto';
import UpdateSkillDto from './dto/update-skill.dto';
import SkillEntity from './entities/skill.entity';

@ApiTags('Skills')
@Controller('skills')
export default class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  async create(@Body() dto: CreateSkillDto): Promise<SkillEntity> {
    const skills = await this.skillsService.create(dto);
    return skills;
  }

  @Get()
  findAll(): Promise<SkillEntity[]> {
    return this.skillsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<SkillEntity> {
    return this.skillsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateExperienceDto: UpdateSkillDto,
  ): Promise<UpdateResult> {
    return this.skillsService.update(id, updateExperienceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.skillsService.remove(id);
  }
}
