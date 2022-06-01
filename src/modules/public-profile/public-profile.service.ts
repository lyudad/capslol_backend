/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import SkillEntity from '../skills/entities/skill.entity';
import CreatePublicProfileDto from './dto/create-public-profile.dto';
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

  async findOne(id: number) {
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

  async update(id: number, dto: UpdatePublicProfileDto) {
    try {
      return await this.repository.update(id, dto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async remove(id: number) {
    try {
      return await this.repository.delete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async getByUserId(userId: number) {
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
}
