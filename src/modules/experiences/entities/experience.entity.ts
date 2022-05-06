import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('experiences')
export default class ExperienceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  startAt?: string;

  @Column({ type: 'varchar', length: 255 })
  endAt?: string;
}
