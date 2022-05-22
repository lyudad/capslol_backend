import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Query,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import JobsService from './jobs.service';
import CreateJobDto from './dto/create-job.dto';
import JWTGuard from '../auth/guards/jwt.guard';
import SearchQuery from './dto/search.query';

@Controller('jobs')
export default class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(JWTGuard)
  async create(@Body() createJobDto: CreateJobDto) {
    try {
      const response = await this.jobsService.create(createJobDto);
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @UseGuards(JWTGuard)
  async findAll() {
    try {
      const response = await this.jobsService.findAll();
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('search')
  @UsePipes(new ValidationPipe())
  @UseGuards(JWTGuard)
  async search(@Query() searchQuery: SearchQuery) {
    const { q, category, skills, timeAvailable, price, languageLevel } =
      searchQuery;
    const response = await this.jobsService.search(
      q,
      category,
      skills,
      timeAvailable,
      price,
      languageLevel,
    );

    return response;
  }

  @Get('/:id')
  @UseGuards(JWTGuard)
  async UserId(@Param('id') id: number) {
    const job = await this.jobsService.findById(id);
    return job;
  }
}
