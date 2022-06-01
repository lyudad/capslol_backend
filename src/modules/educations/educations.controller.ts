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
import { DeleteResult, UpdateResult } from 'typeorm';
import EducationsService from './educations.service';
import CreateEducationDto from './dto/create-education.dto';
import UpdateEducationDto from './dto/update-education.dto';
import EducationEntity from './entities/education.entity';

@ApiTags('Educations')
@Controller('educations')
export default class EducationsController {
  constructor(private readonly educationsService: EducationsService) {}

  @Post()
  create(
    @Body() createEducationDto: CreateEducationDto,
  ): Promise<EducationEntity> {
    return this.educationsService.create(createEducationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<EducationEntity> {
    return this.educationsService.findOne(id);
  }

  @Get()
  findAll(): Promise<EducationEntity[]> {
    return this.educationsService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateEducationDto: UpdateEducationDto,
  ): Promise<UpdateResult> {
    return this.educationsService.update(id, updateEducationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.educationsService.remove(id);
  }
}
