import { Factory, Seeder } from 'typeorm-seeding';
import UserEntity from 'src/modules/auth/entity/user.entity';
import SkillEntity from 'src/modules/skills/entities/skill.entity';
import CategoryEntity from 'src/modules/categories/entities/category.entity';
import JobEntity from 'src/modules/jobs/entities/job.entity';
import { Connection } from 'typeorm';

export default class AddJobs implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    try {
      const jobRepository = await connection.getRepository(JobEntity);

      const users: UserEntity[] = await factory(UserEntity)().createMany(20);
      const skills: SkillEntity[] = await factory(SkillEntity)().createMany(10);
      const categories: CategoryEntity[] = await factory(
        CategoryEntity,
      )().createMany(10);

      await Promise.all(
        Array.from(new Array(3)).map(async () => {
          const newJob = new JobEntity();

          const formatedSkills = skills.map(() => ({
            id: skills[Math.floor(Math.random() * skills.length)].id,
          }));

          const preparedJob = await factory(JobEntity)().make();

          const jobEntity = Object.assign(newJob, preparedJob, {
            ownerId: users[Math.floor(Math.random() * users.length)].id,
            skills: formatedSkills,
            categoryId:
              categories[Math.floor(Math.random() * categories.length)].id,
          });
          await jobRepository.save(jobEntity);
        }),
      );
    } catch (error) {
      throw error.message;
    }
  }
}

// await factory(JobEntity)().map(async (job: JobEntity) => {
//   const userIds = users.map((user) => user.id);

//   const skillIds = skills.map((skill) => skill.id);

//   const categoryIds = categories.map((category) => category.id);

//   job.ownerId = userIds[Math.floor(Math.random() * userIds.length)];

//   job.categoryId = skillIds[Math.floor(Math.random() * skillIds.length)];

//   job.skills =
//     categoryIds[Math.floor(Math.random() * categoryIds.length)];
// });
