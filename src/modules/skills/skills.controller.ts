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

@ApiTags('Skills')
@Controller('skills')
export default class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  async create(@Body() dto: CreateSkillDto) {
    const skills = await this.skillsService.create(dto);
    return skills;
  }

  @Get()
  findAll() {
    return this.skillsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.skillsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateExperienceDto: UpdateSkillDto) {
    return this.skillsService.update(id, updateExperienceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.skillsService.remove(id);
  }
}
