import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import CreateSkillDto from './dto/create-skill.dto';
import UpdateSkillDto from './dto/update-skill.dto';
import SkillEntity from './entities/skill.entity';

@Injectable()
export default class SkillsService {
  constructor(
    @InjectRepository(SkillEntity)
    private repository: Repository<SkillEntity>,
  ) {}

  async create(skills: CreateSkillDto): Promise<SkillEntity> {
    try {
      const newSkills = await this.repository.save(skills);
      return newSkills;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findAll(): Promise<SkillEntity[]> {
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

  async findOne(id: number): Promise<SkillEntity> {
    try {
      const newSkills = await this.repository.findOne(id);
      return newSkills;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async update(id: number, dto: UpdateSkillDto): Promise<UpdateResult> {
    try {
      const newSkills = await this.repository.update(id, dto);
      return newSkills;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    try {
      const newSkills = await this.repository.delete(id);
      return newSkills;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
