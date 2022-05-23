import { faker as Faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';

import JobEntity from 'src/modules/jobs/entities/job.entity';
import English from 'src/modules/jobs/constants/request.constants';
import { englishLevels } from '../mocks.dataset';
import { getRandomElement, getRandomInt } from '../helpers/random.helper';

define(JobEntity, (faker: typeof Faker) => {
  const job = new JobEntity();

  job.title = faker.lorem.words(5);
  job.description = faker.lorem.paragraphs();
  job.price = getRandomInt(1, 1000);
  job.timeAvailable = getRandomInt(1, 12);
  job.languageLevel = getRandomElement(englishLevels) as English;

  return job;
});
