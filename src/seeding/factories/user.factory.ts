import { faker as Faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';

import UserEntity from 'src/modules/auth/entity/user.entity';
import { Role } from 'src/modules/auth/types/user.interface';

define(UserEntity, (faker: typeof Faker) => {
  const user = new UserEntity();
  user.firstName = faker.name.firstName();
  user.lastName = faker.name.lastName();
  user.email = faker.internet.exampleEmail();
  user.phoneNumber = faker.phone.phoneNumber('+996-###-##-##-##');
  user.password = faker.internet.password(20);
  user.isGoogle = false;

  const roles = ['Freelancer', 'Job Owner'];
  user.role = roles[Math.floor(Math.random() * roles.length)] as Role;

  return user;
});
