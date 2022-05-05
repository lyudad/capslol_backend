import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EducationsService } from './educations.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';

@Controller('educations')
export class EducationsController {
  constructor(private readonly educationsService: EducationsService) {}

  @Post()
  create(@Body() createEducationDto: CreateEducationDto) {
    return this.educationsService.create(createEducationDto);
  }

  @Get()
  findAll() {
    return this.educationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.educationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEducationDto: UpdateEducationDto) {
    return this.educationsService.update(+id, updateEducationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.educationsService.remove(+id);
  }
}
