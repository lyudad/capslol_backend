import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PublicProfile from '../public-profile/entities/public-profile.entity';
import CreateExperienceDto from './dto/create-experience.dto';
// import UpdateExperienceDto from './dto/update-experience.dto';
import ExperienceEntity from './entities/experience.entity';

@Injectable()
export default class ExperiencesService {
  constructor(
    @InjectRepository(ExperienceEntity)
    private repository: Repository<ExperienceEntity>,
  ) {}

  async create(experiense: CreateExperienceDto, publicProfile: PublicProfile) {
    const newExperienses = this.repository.create({
      ...experiense,
      // profile: publicProfile,
    });
    await this.repository.save(newExperienses);
    return newExperienses;
  }

  // async createPost(post: CreatePostDto, user: User) {
  //   const newPost = await this.postsRepository.create({
  //     ...post,
  //     author: user,
  //   });
  //   await this.postsRepository.save(newPost);
  //   return newPost;
  // }

  async findAll(): Promise<ExperienceEntity[]> {
    const category = await this.repository
      .createQueryBuilder()
      .select()
      .getMany();
    return category;
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  // update(id: number, dto: UpdateExperienceDto) {
  //   return this.repository.update(id, dto);
  // }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
