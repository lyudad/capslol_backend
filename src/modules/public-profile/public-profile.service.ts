import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import PageMetaDto from 'src/shared/DTOs/page-meta.dto';
import PageOptionsDto from 'src/shared/DTOs/page-options.dto';
import PageDtoTalents from 'src/shared/DTOs/page-talents.dto';
import PageDto from 'src/shared/DTOs/page.dto';
import { Repository } from 'typeorm';
import InvitationService from '../invitation/invitation.service';
import SkillEntity from '../skills/entities/skill.entity';
import CreatePublicProfileDto from './dto/create-public-profile.dto';
import SearchQueryProfile from './dto/search.query';
import UpdatePublicProfileDto from './dto/update-public-profile.dto';
import PublicProfile from './entities/public-profile.entity';

@Injectable()
export default class PublicProfileService {
  constructor(
    @InjectRepository(PublicProfile)
    private repository: Repository<PublicProfile>,
    private readonly repositoryInvitation: InvitationService,
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

  async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<PublicProfile>> {
    try {
      const pagination = new PageOptionsDto();
      Object.assign(pagination, pageOptionsDto);

      const qb = await this.repository
        .createQueryBuilder('profile')
        .leftJoinAndSelect('profile.user', 'user')
        .leftJoinAndSelect('profile.experiense', 'experiense')
        .leftJoinAndSelect('profile.educations', 'educations')
        .leftJoinAndSelect('profile.categories', 'categories')
        .leftJoinAndSelect('profile.skills', 'skills')
        .orderBy('profile.createdAt', pagination.order);

      const totalCount = await qb.getCount();
      const profiles = await qb
        .skip(pagination.skip)
        .take(pagination.take)
        .getMany();

      const meta = new PageMetaDto({
        itemCount: totalCount,
        options: pagination,
      });
      return new PageDto(profiles, meta);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async search(
    query?: string,
    categoryId?: number,
    skills?: string,
  ): Promise<PublicProfile[]> {
    try {
      let qb = await this.repository
        .createQueryBuilder('profile')
        .leftJoinAndSelect('profile.user', 'user')
        .leftJoinAndSelect('profile.categories', 'categories')
        .leftJoinAndSelect('profile.skills', 'skills')
        .orderBy('profile.createdAt');

      if (query) {
        qb = qb.andWhere(
          'user.firstName like :q OR user.lastName like :q OR profile.other like :q',
          {
            q: `%${query}%`,
          },
        );
      }
      if (categoryId) {
        qb = qb.andWhere('categories.id = :id', {
          id: categoryId,
        });
      }

      if (skills) {
        const skillIds = skills.split('');
        qb = qb.andWhere('skills.id IN (:ids)', {
          ids: skillIds,
        });
      }

      return qb.getMany();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async searchTalents(
    searchQuery: SearchQueryProfile,
  ): Promise<PageDtoTalents<PublicProfile>> {
    try {
      const pagination = new PageOptionsDto();
      Object.assign(pagination, searchQuery);

      const InvitationsDb = await this.repositoryInvitation.findByOwner(
        Number(searchQuery.user),
      );

      let qb = await this.repository
        .createQueryBuilder('profile')
        .leftJoinAndSelect('profile.user', 'user')
        .where('user.role = :role', { role: 'Freelancer' })
        .leftJoinAndSelect('profile.categories', 'categories')
        .leftJoinAndSelect('profile.skills', 'skills')
        .orderBy('profile.createdAt', searchQuery.order);

      if (searchQuery.q) {
        qb = qb.andWhere(
          'user.firstName like :q OR user.lastName like :q OR profile.other like :q',
          {
            q: `%${searchQuery.q}%`,
          },
        );
      }
      if (searchQuery.category) {
        qb = qb.andWhere('categories.id = :id', {
          id: searchQuery.category,
        });
      }

      if (searchQuery.skills) {
        const skillIds = searchQuery.skills.split('');
        qb = qb.andWhere('skills.id IN (:ids)', {
          ids: skillIds,
        });
      }

      const totalCount = await qb.getCount();
      const talents = await qb.skip(pagination.skip).take(12).getMany();

      const meta = new PageMetaDto({
        itemCount: totalCount,
        options: pagination,
      });

      return new PageDtoTalents(talents, InvitationsDb, meta);
      return undefined;
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
}
