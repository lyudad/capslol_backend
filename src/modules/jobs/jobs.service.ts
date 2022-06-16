import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import AuthServive from '../auth/auth.service';
import CategoriesService from '../categories/categories.service';
import SkillsService from '../skills/skills.service';
import JobResponse from './constants/response.constants';
import CreateJobDto from './dto/create-job.dto';
import PageMetaDto from './dto/page-meta.dto';
import PageOptionsDto from './dto/page-options.dto';
import PageDto from './dto/page.dto';
import JobEntity from './entities/job.entity';
import { English } from './types/entity.types';

@Injectable()
export default class JobsService {
  constructor(
    @InjectRepository(JobEntity)
    private readonly jobRepository: Repository<JobEntity>,
    private readonly userService: AuthServive,
    private readonly categoryService: CategoriesService,
    private readonly skillService: SkillsService,
  ) {}

  async create(createJobDto: CreateJobDto): Promise<JobEntity> {
    try {
      const { skills, categoryId, ownerId } = createJobDto;
      const user = await this.userService.getUserById(ownerId);
      if (!user) {
        throw new HttpException(
          JobResponse.INVALID_OWNER_ID,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      const category = await this.categoryService.findOne(categoryId);

      if (!category) {
        throw new HttpException(
          JobResponse.INVALID_CATEGORY_ID,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      if (skills.length <= 0) {
        throw new HttpException(
          JobResponse.HAS_SKILLS,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      const newJob = new JobEntity();

      const formatedSkills = await Promise.all(
        createJobDto.skills.map(async (skillId) => {
          const skill = await this.skillService.findOne(skillId);
          if (!skill) {
            throw new HttpException(
              JobResponse.INVALID_SKILL_ID + skillId,
              HttpStatus.UNPROCESSABLE_ENTITY,
            );
          }
          return { id: skillId };
        }),
      );

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

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<JobEntity>> {
    try {
      const queryBuilder = await this.jobRepository.createQueryBuilder('jobs');
      const jobs = await queryBuilder
        .leftJoinAndSelect('jobs.ownerId', 'owner')
        .leftJoinAndSelect('jobs.categoryId', 'categories')
        .leftJoinAndSelect('jobs.skills', 'skills')
        .orderBy('jobs.createdAt', pageOptionsDto.order)
        .skip(pageOptionsDto.skip)
        .take(pageOptionsDto.take)
        .getMany();

      const totalCount = await queryBuilder.getCount();

      const meta = new PageMetaDto({
        itemCount: totalCount,
        options: pageOptionsDto,
      });
      return new PageDto(jobs, meta);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async search(
    query?: string,
    categoryId?: number,
    skills?: string,
    timeAvailable?: number,
    price?: number,
    languageLevel?: English,
  ): Promise<JobEntity[]> {
    try {
      let qb = await this.jobRepository
        .createQueryBuilder('jobs')
        .leftJoinAndSelect('jobs.ownerId', 'user')
        .leftJoinAndSelect('jobs.categoryId', 'categories')
        .leftJoinAndSelect('jobs.skills', 'skills')
        .orderBy('-jobs.createdAt');

      if (query) {
        qb = qb.andWhere('jobs.title like :q OR jobs.description like :q', {
          q: `%${query}%`,
        });
      }
      if (categoryId) {
        qb = qb.andWhere('categories.id = :id', {
          id: categoryId,
        });
      }

      if (skills) {
        const skillIds = skills.split('');
        qb = qb.andWhere('skills.id IN (:ids)', {
          ids: skillIds,
        });
      }

      if (timeAvailable) {
        qb = qb.andWhere('jobs.timeAvailable = :timeAvailable', {
          timeAvailable,
        });
      }

      if (languageLevel) {
        qb = qb.andWhere('jobs.languageLevel = :languageLevel', {
          languageLevel,
        });
      }

      if (price) {
        qb = qb.andWhere('jobs.price = :price', { price });
      }

      return qb.getMany();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findById(id: number): Promise<JobEntity> {
    try {
      const job = await this.jobRepository
        .createQueryBuilder('jobs')
        .leftJoinAndSelect('jobs.ownerId', 'user')
        .leftJoinAndSelect('jobs.categoryId', 'categories')
        .leftJoinAndSelect('jobs.skills', 'skills')
        .select('')
        .where('jobs.id = :id', { id })
        .getOne();
      return job;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async searchByOwner(ownerId: number): Promise<JobEntity[]> {
    try {
      const jobs = await this.jobRepository
        .createQueryBuilder('jobs')
        .leftJoinAndSelect('jobs.ownerId', 'owner')
        .leftJoinAndSelect('jobs.categoryId', 'categories')
        .leftJoinAndSelect('jobs.skills', 'skills')
        .orderBy('jobs.createdAt', 'DESC')
        .andWhere('ownerId = :id', {
          id: ownerId,
        });
      return jobs.getMany();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async toggleStatus(id: number): Promise<JobEntity> {
    try {
      await this.jobRepository
        .createQueryBuilder()
        .update()
        .set({
          isArchived: () => 'NOT isArchived',
        })
        .where('id = :id', { id })
        .execute();
      const result = await this.findById(id);
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
