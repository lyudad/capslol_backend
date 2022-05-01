import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreatePublicProfileDto from './dto/create-public-profile.dto';
import UpdatePublicProfileDto from './dto/update-public-profile.dto';
import PublicProfile from './entities/public-profile.entity';

@Injectable()
export default class PublicProfileService {
  constructor(
    @InjectRepository(PublicProfile)
    private repository: Repository<PublicProfile>,
  ) {}

  async create(dto: CreatePublicProfileDto) {
    const profile = this.repository.save({
      ...dto,
      user: { id: dto.userId },
    });
    return profile;
  }

  async findAll(): Promise<PublicProfile[]> {
    const profiles = await this.repository
      .createQueryBuilder()
      .select()
      .getMany();
    return profiles;
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, dto: UpdatePublicProfileDto) {
    return this.repository.update(id, dto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
