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

      const skillsRepository = await connection.getRepository(SkillEntity);
      const skillsDB = await skillsRepository
        .createQueryBuilder('skills')
        .getMany();

      const categoryRepository = await connection.getRepository(CategoryEntity);
      const categoriesDB = await categoryRepository
        .createQueryBuilder('categories')
        .getMany();

      const users: UserEntity[] = await factory(UserEntity)().createMany(10);

      let skills;

      if (skillsDB.length) {
        skills = skillsDB;
      }
      if (!skillsDB.length) {
        skills = await factory(SkillEntity)().createMany(10);
      }

      let categories;
      if (categoriesDB.length) {
        categories = categoriesDB;
      }
      if (!categoriesDB.length) {
        categories = await factory(CategoryEntity)().createMany(10);
      }

      await Promise.all(
        Array.from(new Array(10)).map(async () => {
          const newJob = new JobEntity();

          const { id: randomOwnerId } = await getRandomElement(users);
          const { id: randomSkillId } = await getRandomElement(skills);
          const { id: randomCategoryId } = await getRandomElement(categories);

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
