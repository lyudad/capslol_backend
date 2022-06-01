import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import CreateCategoryDto from './dto/create-category.dto';
import UpdateCategoryDto from './dto/update-category.dto';
import CategoryEntity from './entities/category.entity';

@Injectable()
export default class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private repository: Repository<CategoryEntity>,
  ) {}

  async create(categories: CreateCategoryDto): Promise<CategoryEntity> {
    try {
      const newCategories = await this.repository.save(categories);
      return newCategories;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findAll(): Promise<CategoryEntity[]> {
    try {
      const categories = await this.repository
        .createQueryBuilder()
        .select()
        .getMany();
      return categories;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findOne(id: number): Promise<CategoryEntity> {
    try {
      const newCategories = await this.repository.findOne(id);
      return newCategories;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async update(id: number, dto: UpdateCategoryDto): Promise<UpdateResult> {
    try {
      const newCategories = await this.repository.update(id, dto);
      return newCategories;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    try {
      const newCategories = await this.repository.delete(id);
      return newCategories;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
