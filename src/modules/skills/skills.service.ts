import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateSkillDto from './dto/create-skill.dto';
import UpdateSkillDto from './dto/update-skill.dto';
import SkillEntity from './entities/skill.entity';

@Injectable()
export default class SkillsService {
  constructor(
    @InjectRepository(SkillEntity)
    private repository: Repository<SkillEntity>,
  ) {}

  async create(skills: CreateSkillDto) {
    const newSkills = await this.repository.save({
      ...skills,
    });
    await this.repository.save(newSkills);
    return newSkills;
  }

  async findAll(): Promise<SkillEntity[]> {
    const category = await this.repository
      .createQueryBuilder()
      .select()
      .getMany();
    return category;
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, dto: UpdateSkillDto) {
    return this.repository.update(id, dto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
