import UserEntity from 'src/modules/auth/entity/user.entity';
import CategoryEntity from 'src/modules/categories/entities/category.entity';
import SkillEntity from 'src/modules/skills/entities/skill.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'jobs' })
export default class JobEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'integer' })
  price: number;

  @Column({ type: 'integer' })
  timeAvailable: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @OneToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: 'ownerId' })
  owner: UserEntity;

  @OneToOne(() => CategoryEntity, { nullable: false })
  @JoinColumn({ name: 'categoryId' })
  category: CategoryEntity;

  @ManyToMany(() => SkillEntity)
  @JoinTable({
    name: 'skills_jobs',
    joinColumn: {
      name: 'jobId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'skillId',
      referencedColumnName: 'id',
    },
  })
  skills: SkillEntity[];

  @Column({ type: 'integer' })
  languageLevel: number;
}
