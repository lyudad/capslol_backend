import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SkillProfileService } from './skill-profile.service';
import { CreateSkillProfileDto } from './dto/create-skill-profile.dto';
import { UpdateSkillProfileDto } from './dto/update-skill-profile.dto';

@Controller('skill-profile')
export class SkillProfileController {
  constructor(private readonly skillProfileService: SkillProfileService) {}

  @Post()
  create(@Body() createSkillProfileDto: CreateSkillProfileDto) {
    return this.skillProfileService.create(createSkillProfileDto);
  }

  @Get()
  findAll() {
    return this.skillProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.skillProfileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSkillProfileDto: UpdateSkillProfileDto) {
    return this.skillProfileService.update(+id, updateSkillProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.skillProfileService.remove(+id);
  }
}
