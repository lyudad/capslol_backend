import UserEntity from 'src/modules/auth/entity/user.entity';
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
  profile_image?: string;

  @Column({ type: 'integer' })
  hour_rate?: number;

  @Column({ type: 'integer' })
  available_hours?: number;

  @Column('int')
  education_id?: number;

  @Column('int')
  category_id: number;

  @Column({ type: 'varchar', length: 255 })
  position?: string;

  // @Column('int')
  @ManyToOne(() => ExperienceEntity, (e: ExperienceEntity) => e.id)
  experienses: ExperienceEntity[];

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
