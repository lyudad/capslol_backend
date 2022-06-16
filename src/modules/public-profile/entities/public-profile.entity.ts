import UserEntity from 'src/modules/auth/entity/user.entity';
import CategoryEntity from 'src/modules/categories/entities/category.entity';
import EducationEntity from 'src/modules/educations/entities/education.entity';
import ExperienceEntity from 'src/modules/experiences/entities/experience.entity';
import SkillEntity from 'src/modules/skills/entities/skill.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

enum English {
  NOENGLISH = 'No English',
  BEGINNER = 'Beginner',
  PREINTERMEDIATE = 'Pre-Intermediate',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
  NOSET = 'No set',
}

@Entity('profiles')
export default class PublicProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({ type: 'varchar', length: 385, nullable: true })
  profileImage?: string;

  @Column({ type: 'integer' })
  hourRate?: number;

  @Column({ type: 'integer' })
  availableHours?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  position?: string;

  @Column({
    type: 'enum',
    enum: English,
    default: English.NOSET,
  })
  english: English;

  @Column({ type: 'text', nullable: true })
  other?: string;

  @ManyToMany(() => EducationEntity, { nullable: true })
  @JoinTable({ name: 'educations_profiles' })
  educations: EducationEntity[];

  @ManyToMany(() => ExperienceEntity, { nullable: true })
  @JoinTable({ name: 'experiense_profiles' })
  experiense: ExperienceEntity[];

  @ManyToOne(() => CategoryEntity, (category: CategoryEntity) => category.id)
  categories: CategoryEntity[];

  @ManyToMany(() => SkillEntity)
  @JoinTable({ name: 'skills_profiles' })
  skills: SkillEntity[];

  @CreateDateColumn({ type: 'datetime' })
  createdAt: string;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: string;
}
