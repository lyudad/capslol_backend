import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import CreateEducationDto from './dto/create-education.dto';
import UpdateEducationDto from './dto/update-education.dto';
import EducationEntity from './entities/education.entity';

@Injectable()
export default class EducationsService {
  constructor(
    @InjectRepository(EducationEntity)
    private repository: Repository<EducationEntity>,
  ) {}

  async create(educations: CreateEducationDto): Promise<EducationEntity> {
    try {
      const newEducatio = await this.repository.save(educations);
      return newEducatio;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findAll(): Promise<EducationEntity[]> {
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

  async findOne(id: number): Promise<EducationEntity> {
    try {
      const newEducatio = await this.repository.findOne(id);
      return newEducatio;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async update(id: number, dto: UpdateEducationDto): Promise<UpdateResult> {
    try {
      const newEducatio = await this.repository.update(id, dto);
      return newEducatio;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    try {
      const newEducatio = await this.repository.delete(id);
      return newEducatio;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
