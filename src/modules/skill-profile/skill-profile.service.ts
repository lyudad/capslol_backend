import { Injectable } from '@nestjs/common';
import { CreateSkillProfileDto } from './dto/create-skill-profile.dto';
import { UpdateSkillProfileDto } from './dto/update-skill-profile.dto';

@Injectable()
export class SkillProfileService {
  create(createSkillProfileDto: CreateSkillProfileDto) {
    return 'This action adds a new skillProfile';
  }

  findAll() {
    return `This action returns all skillProfile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} skillProfile`;
  }

  update(id: number, updateSkillProfileDto: UpdateSkillProfileDto) {
    return `This action updates a #${id} skillProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} skillProfile`;
  }
}
