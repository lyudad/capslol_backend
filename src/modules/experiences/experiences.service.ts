import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import CreateExperienceDto from './dto/create-experience.dto';
import UpdateExperienceDto from './dto/update-experience.dto';
import ExperienceEntity from './entities/experience.entity';

@Injectable()
export default class ExperiencesService {
  constructor(
    @InjectRepository(ExperienceEntity)
    private repository: Repository<ExperienceEntity>,
  ) {}

  async create(experiense: CreateExperienceDto): Promise<ExperienceEntity> {
    try {
      const newExperienses = await this.repository.save(experiense);
      return newExperienses;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findAll(): Promise<ExperienceEntity[]> {
    try {
      const category = await this.repository
        .createQueryBuilder()
        .select()
        .getMany();
      return category;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findOne(id: number): Promise<ExperienceEntity> {
    try {
      const expirience = await this.repository.findOne(id);
      return expirience;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async update(id: number, dto: UpdateExperienceDto): Promise<UpdateResult> {
    try {
      const expirience = await this.repository.update(id, dto);
      return expirience;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    try {
      const expirience = await this.repository.delete(id);
      return expirience;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
