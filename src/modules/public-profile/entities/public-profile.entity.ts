import UserEntity from 'src/modules/auth/entity/user.entity';
import EducationEntity from 'src/modules/educations/entities/education.entity';
import ExperienceEntity from 'src/modules/experiences/entities/experience.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  // OneToMany,
  OneToOne,
  // PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

enum English {
  NOENGLISH = 'No English',
  BEGINNER = 'Beginner',
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

  @ManyToOne(() => EducationEntity, (e: EducationEntity) => e.id)
  educations: EducationEntity[];

  @Column('int')
  categoryId: number;

  @Column({ type: 'varchar', length: 255 })
  position?: string;

  @ManyToOne(() => ExperienceEntity, (e: ExperienceEntity) => e.id)
  experiense: ExperienceEntity[];

  @Column({
    type: 'enum',
    enum: English,
    default: English.NOSET,
  })
  english?: English;

  @Column({ type: 'text' })
  other?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
