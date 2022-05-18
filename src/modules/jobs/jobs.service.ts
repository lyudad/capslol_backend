import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import JobResponse from './constants/response.constants';
import CreateJobDto from './dto/create-job.dto';
import UpdateJobDto from './dto/update-job.dto';
import JobEntity from './entities/job.entity';

@Injectable()
export default class JobsService {
  constructor(
    @InjectRepository(JobEntity)
    private readonly jobRepository: Repository<JobEntity>,
  ) {}

  async create(createJobDto: CreateJobDto): Promise<JobEntity> {
    try {
      if (createJobDto.skills.length <= 0) {
        throw new HttpException(
          JobResponse.HAS_SKILLS,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      const newJob = new JobEntity();

      const formatedSkills = createJobDto.skills.map((skillId) => ({
        id: skillId,
      }));

      const jobEntity = Object.assign(newJob, createJobDto, {
        skills: formatedSkills,
      });

      const createdJob = await this.jobRepository.save(jobEntity);
      const response = await this.findById(createdJob.id);

      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findAll(): Promise<JobEntity[]> {
    try {
      const jobs = await this.jobRepository
        .createQueryBuilder('jobs')
        .leftJoinAndSelect('jobs.ownerId', 'owner')
        .leftJoinAndSelect('jobs.categoryId', 'categories')
        .leftJoinAndSelect('jobs.skills', 'skills')
        .getMany();
      return jobs;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} job`;
  }

  async findById(id: number): Promise<JobEntity> {
    try {
      const job = this.jobRepository
        .createQueryBuilder('job')
        .select('')
        .where('job.id = :id', { id })
        .getOne();
      return job;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}
