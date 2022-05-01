import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export default class PublicProfile {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: 'varchar', length: 255 })
  profile_image: string;

  hour_rate: number;

  available_hours: number;

  education_id: number;

  category_id: number;

  position: string;

  experiense_id: number;

  skill_id: number;

  language_id: number;

  other: string;
}
