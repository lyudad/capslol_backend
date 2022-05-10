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

  @Column({ type: 'varchar', length: 255 })
  profileImage?: string;

  @Column({ type: 'integer' })
  hourRate?: number;

  @Column({ type: 'integer' })
  availableHours?: number;

  @Column({ type: 'varchar', length: 255 })
  position?: string;

  @Column({
    type: 'enum',
    enum: English,
    default: English.NOSET,
  })
  english?: English;

  @Column({ type: 'text' })
  other?: string;

  @ManyToOne(() => EducationEntity, (e: EducationEntity) => e.id)
  educations: EducationEntity[];

  @ManyToOne(() => ExperienceEntity, (e: ExperienceEntity) => e.id)
  experiense: ExperienceEntity[];

  @ManyToOne(() => CategoryEntity, (e: CategoryEntity) => e.id)
  categories: CategoryEntity[];

  @ManyToMany(() => SkillEntity)
  @JoinTable()
  skills: SkillEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}