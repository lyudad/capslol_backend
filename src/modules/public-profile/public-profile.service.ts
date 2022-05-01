import { Injectable } from '@nestjs/common';
import CreatePublicProfileDto from './dto/create-public-profile.dto';
import UpdatePublicProfileDto from './dto/update-public-profile.dto';

@Injectable()
export default class PublicProfileService {
  create(createPublicProfileDto: CreatePublicProfileDto) {
    return 'This action adds a new publicProfile';
  }

  findAll() {
    return `This action returns all publicProfile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} publicProfile`;
  }

  update(id: number, updatePublicProfileDto: UpdatePublicProfileDto) {
    return `This action updates a #${id} publicProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} publicProfile`;
  }
}
