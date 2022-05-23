import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import UserEntity from 'src/modules/auth/entity/user.entity';
import SkillEntity from 'src/modules/skills/entities/skill.entity';
import CategoryEntity from 'src/modules/categories/entities/category.entity';
import JobEntity from 'src/modules/jobs/entities/job.entity';
import { getRandomElement } from '../helpers/random.helper';

export default class AddJobs implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    try {
      const jobRepository = await connection.getRepository(JobEntity);

      const users: UserEntity[] = await factory(UserEntity)().createMany(10);
      const skills: SkillEntity[] = await factory(SkillEntity)().createMany(10);
      const categories: CategoryEntity[] = await factory(
        CategoryEntity,
      )().createMany(10);

      await Promise.all(
        Array.from(new Array(10)).map(async () => {
          const newJob = new JobEntity();

          const { id: randomOwnerId } = getRandomElement(users);
          const { id: randomCategoryId } = getRandomElement(categories);
          const { id: randomSkillId } = getRandomElement(skills);

          const preparedJob = await factory(JobEntity)().make();

          const jobEntity = Object.assign(newJob, preparedJob, {
            ownerId: randomOwnerId,
            categoryId: randomCategoryId,
            skills: [{ id: randomSkillId }],
          });

          await jobRepository.save(jobEntity);
        }),
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
