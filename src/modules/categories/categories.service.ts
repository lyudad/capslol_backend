import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateCategoryDto from './dto/create-category.dto';
import UpdateCategoryDto from './dto/update-category.dto';
import CategoryEntity from './entities/category.entity';

@Injectable()
export default class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private repository: Repository<CategoryEntity>,
  ) {}

  async create(categories: CreateCategoryDto) {
    const newCategories = await this.repository.save({
      ...categories,
    });
    await this.repository.save(newCategories);
    return newCategories;
  }

  async findAll(): Promise<CategoryEntity[]> {
    const categories = await this.repository
      .createQueryBuilder()
      .select()
      .getMany();
    return categories;
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, dto: UpdateCategoryDto) {
    return this.repository.update(id, dto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
