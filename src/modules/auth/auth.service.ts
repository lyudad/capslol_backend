import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateUserDto from './dto/create-user.dto';
import UserEntity from './user.entity';

@Injectable()
export default class AuthServive {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  async allUsers(): Promise<UserEntity[]> {
    const users = await this.userRepository.createQueryBuilder().getMany();
    return users;
  }

  async createUser(user: CreateUserDto) {
    const newUser = await this.userRepository.createQueryBuilder().insert().values(user).execute()
    return newUser
  }
}
