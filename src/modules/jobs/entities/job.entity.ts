import UserEntity from 'src/modules/auth/entity/user.entity';
import CategoryEntity from 'src/modules/categories/entities/category.entity';
import SkillEntity from 'src/modules/skills/entities/skill.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { English, ProjectDuration } from '../types/entity.types';

@Entity({ name: 'jobs' })
export default class JobEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'integer' })
  price: number;

  @Column({ type: 'integer' })
  timeAvailable: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: 'ownerId' })
  ownerId: UserEntity;

  @ManyToOne(() => CategoryEntity, { nullable: false })
  @JoinColumn({ name: 'categoryId' })
  categoryId: CategoryEntity;

  @ManyToMany(() => SkillEntity, (skill) => skill.jobs, { cascade: true })
  @JoinTable({
    name: 'skills_jobs',
  })
  skills: SkillEntity[];

  @Column({
    type: 'enum',
    enum: English,
    nullable: true,
  })
  languageLevel: English;

  @Column({ type: 'enum', enum: ProjectDuration, nullable: true })
  projectDuration: ProjectDuration;

  @Column({ type: 'boolean', default: false })
  isArchived: false;
}
