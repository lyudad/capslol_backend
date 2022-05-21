import { faker as Faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';

import JobEntity from 'src/modules/jobs/entities/job.entity';
import English from 'src/modules/jobs/constants/request.constants';
import { englishLevels } from '../mocks.dataset';

define(JobEntity, (faker: typeof Faker) => {
  const job = new JobEntity();

  job.title = faker.lorem.words(5);
  job.description = faker.lorem.paragraphs();
  //   job.price = faker.mersenne.rand(100, 10);
  job.price = 10;
  //   job.timeAvailable = faker.mersenne.rand(40, 1);
  job.timeAvailable = 12;
  job.languageLevel = englishLevels[
    Math.floor(Math.random() * englishLevels.length)
  ] as English;

  console.log(job);

  return job;
});
