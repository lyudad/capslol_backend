import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateEducationDto from './dto/create-education.dto';
import UpdateEducationDto from './dto/update-education.dto';
import EducationEntity from './entities/education.entity';

@Injectable()
export default class EducationsService {
  constructor(
    @InjectRepository(EducationEntity)
    private repository: Repository<EducationEntity>,
  ) {}

  async create(educations: CreateEducationDto) {
    const newEducatio = await this.repository.save({
      ...educations,
    });
    await this.repository.save(newEducatio);
    return newEducatio;
  }

  async findAll(): Promise<EducationEntity[]> {
    const category = await this.repository
      .createQueryBuilder()
      .select()
      .getMany();
    return category;
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, dto: UpdateEducationDto) {
    return this.repository.update(id, dto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
