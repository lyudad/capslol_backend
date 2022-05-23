import { faker as Faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';

import CategoryEntity from 'src/modules/categories/entities/category.entity';

define(CategoryEntity, (faker: typeof Faker) => {
  const category = new CategoryEntity();

  category.categoryName = faker.name.jobType();

  return category;
});
