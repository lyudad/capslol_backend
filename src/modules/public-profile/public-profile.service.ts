import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import SkillEntity from '../skills/entities/skill.entity';
import CreatePublicProfileDto from './dto/create-public-profile.dto';
import UpdateProfileImageDto from './dto/update-image.dto';
import UpdatePublicProfileDto from './dto/update-public-profile.dto';
import PublicProfile from './entities/public-profile.entity';

@Injectable()
export default class PublicProfileService {
  constructor(
    @InjectRepository(PublicProfile)
    private repository: Repository<PublicProfile>,
  ) {}

  async create(dto: CreatePublicProfileDto): Promise<SkillEntity[]> {
    try {
      const newProfile = await this.repository.save({
        ...dto,
        user: { id: dto.userId },
        educations: dto.educations
          ? dto.educations.map((e: number) => ({ id: e }))
          : undefined,
        experiense: dto.experiense
          ? dto.experiense.map((e: number) => ({ id: e }))
          : undefined,
        skills: dto.skills
          ? dto.skills.map((e: number) => ({ id: e }))
          : undefined,
      });
      return newProfile;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findAll(): Promise<PublicProfile[]> {
    try {
      const profiles = await this.repository
        .createQueryBuilder('profile')
        .leftJoinAndSelect('profile.user', 'user')
        .leftJoinAndSelect('profile.experiense', 'experiense')
        .leftJoinAndSelect('profile.educations', 'educations')
        .leftJoinAndSelect('profile.categories', 'categories')
        .leftJoinAndSelect('profile.skills', 'skills')
        .getMany();

      return profiles;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findOne(id: number): Promise<PublicProfile> {
    try {
      return await this.repository
        .createQueryBuilder('profile')
        .leftJoinAndSelect('profile.user', 'user')
        .leftJoinAndSelect('profile.experiense', 'experiense')
        .leftJoinAndSelect('profile.educations', 'educations')
        .leftJoinAndSelect('profile.categories', 'categories')
        .leftJoinAndSelect('profile.skills', 'skills')
        .where('profile.id = :profileId', { profileId: id })
        .getOne();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async update(dto: UpdatePublicProfileDto): Promise<PublicProfile> {
    try {
      const newProfile = await this.repository.save({
        ...dto,
        user: { id: dto.userId },
        skills: dto.skills
          ? dto.skills.map((e: number) => ({ id: e }))
          : undefined,
        experiense: dto.experiense
          ? dto.experiense.map((e: number) => ({ id: e }))
          : undefined,
        educations: dto.educations
          ? dto.educations.map((e: number) => ({ id: e }))
          : undefined,
      });
      return newProfile;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async remove(id: number): Promise<PublicProfile> {
    try {
      await this.repository.delete(id);
      return;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async getByUserId(userId: number): Promise<PublicProfile> {
    try {
      const profile = await this.repository
        .createQueryBuilder('userProfile')
        .leftJoinAndSelect('userProfile.categories', 'categories')
        .leftJoinAndSelect('userProfile.skills', 'skills')
        .select('')
        .where('userId = :userId', { userId })
        .getOne();

      return profile;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async updateOwnerPhoto(
    id: number,
    updateProfileImageDto: UpdateProfileImageDto,
  ): Promise<PublicProfile> {
    try {
      await this.repository
        .createQueryBuilder()
        .update()
        .set({ profileImage: updateProfileImageDto.profileImage })
        .where('id = :id', { id })
        .execute();

      const profile = await this.findOne(id);

      return profile;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
