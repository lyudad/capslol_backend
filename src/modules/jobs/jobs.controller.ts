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
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import JobsService from './jobs.service';
import CreateJobDto from './dto/create-job.dto';
import JWTGuard from '../auth/guards/jwt.guard';
import SearchQuery from './dto/search.query';
import JobEntity from './entities/job.entity';
import GetJobQuery from './dto/get-job.query';
import ToggleQuery from './dto/toggle-job.query';
import PageOptionsDto from './dto/page-options.dto';
import PageDto from './dto/page.dto';
import SearchByOwnerQuery from './dto/search-by-owner.query';

@ApiTags('Jobs')
@ApiBearerAuth()
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer $your.token',
})
@Controller('jobs')
export default class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(JWTGuard)
  async create(@Body() createJobDto: CreateJobDto): Promise<JobEntity> {
    try {
      const response = await this.jobsService.create(createJobDto);
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @UsePipes(new ValidationPipe())
  @UseGuards(JWTGuard)
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<JobEntity>> {
    try {
      const response = await this.jobsService.findAll(pageOptionsDto);
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('search')
  @UsePipes(new ValidationPipe())
  @UseGuards(JWTGuard)
  async search(@Query() searchQuery: SearchQuery): Promise<JobEntity[]> {
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

  @Get('getJob')
  @UsePipes(new ValidationPipe())
  @UseGuards(JWTGuard)
  async getJobById(@Query() query: GetJobQuery): Promise<JobEntity> {
    const job = await this.jobsService.findById(query.jobId);
    return job;
  }

  @Get('searchByOwner')
  @UsePipes(new ValidationPipe())
  async searchByOwner(
    @Query() searchQuery: SearchByOwnerQuery,
  ): Promise<JobEntity[]> {
    try {
      const { ownerId } = searchQuery;
      const jobs = await this.jobsService.searchByOwner(ownerId);
      return jobs;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('toggle')
  async toggleStatus(@Query() query: ToggleQuery): Promise<JobEntity> {
    try {
      const response = await this.jobsService.toggleStatus(query.id);
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
