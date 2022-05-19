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
import English from '../constants/request.constants';

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
    default: English.NOSET,
  })
  languageLevel: English;
}
