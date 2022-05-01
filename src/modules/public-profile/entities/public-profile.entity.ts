import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// enum English {
//   NOENGLISH = 'No English',
//   BEGINNER = 'Beginner',
//   INTERMEDIATE = 'Intermediate',
//   ADVANCED = 'Advanced',
// }

@Entity('profiles')
export default class PublicProfile {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: 'varchar', length: 255 })
  profile_image?: string;

  @Column({ type: 'integer' })
  hour_rate?: number;

  @Column({ type: 'integer' })
  available_hours?: number;

  @Column('int')
  education_id: number;

  @Column('int')
  category_id?: number;

  @Column({ type: 'varchar', length: 255 })
  position?: string;

  @Column('int')
  experiense_id?: number;

  @Column('int')
  skill_id?: number;

  @Column({
    type: 'varchar',
    default: 'not chosen',
  })
  english?: string;

  @Column({ type: 'text' })
  other?: string;
}
