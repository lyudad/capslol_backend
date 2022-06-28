import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PageOptionsDto from 'src/shared/DTOs/page-options.dto';
import PageDto from 'src/shared/DTOs/page.dto';
import AuthServive from '../auth/auth.service';
import CategoriesService from '../categories/categories.service';
import SkillsService from '../skills/skills.service';
import JobResponse from './constants/response.constants';
import CreateJobDto from './dto/create-job.dto';
import PageMetaDto from '../../shared/DTOs/page-meta.dto';
import SearchQueryDto from './dto/search.query.dto';
import JobEntity from './entities/job.entity';

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

  async findAll(searchQueryDto: SearchQueryDto): Promise<PageDto<JobEntity>> {
    try {
      const pagination = new PageOptionsDto();
      Object.assign(pagination, searchQueryDto);

      let qb = await this.jobRepository
        .createQueryBuilder('jobs')
        .leftJoinAndSelect('jobs.ownerId', 'user')
        .leftJoinAndSelect('jobs.categoryId', 'categories')
        .leftJoinAndSelect('jobs.skills', 'skills')
        .orderBy('', pagination.order)
        .orderBy('jobs.createdAt', 'DESC');

      if (searchQueryDto.q) {
        qb = qb.andWhere('jobs.title like :q OR jobs.description like :q', {
          q: `%${searchQueryDto.q}%`,
        });
      }
      if (searchQueryDto.category) {
        qb = qb.andWhere('categories.id = :id', {
          id: searchQueryDto.category,
        });
      }

      if (searchQueryDto.skills) {
        const skillIds = searchQueryDto.skills.split('');
        qb = qb.andWhere('skills.id IN (:ids)', {
          ids: skillIds,
        });
      }

      if (searchQueryDto.timeAvailable) {
        qb = qb.andWhere('jobs.timeAvailable = :timeAvailable', {
          timeAvailable: searchQueryDto.timeAvailable,
        });
      }

      if (searchQueryDto.languageLevel) {
        qb = qb.andWhere('jobs.languageLevel = :languageLevel', {
          languageLevel: searchQueryDto.languageLevel,
        });
      }

      if (searchQueryDto.price) {
        qb = qb.andWhere('jobs.price = :price', {
          price: searchQueryDto.price,
        });
      }

      const jobs = await qb
        .skip(pagination.skip)
        .take(pagination.take)
        .getMany();

      const totalCount = await qb.getCount();

      const meta = new PageMetaDto({
        itemCount: totalCount,
        options: pagination,
      });
      return new PageDto(jobs, meta);
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
