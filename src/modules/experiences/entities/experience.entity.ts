import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('experience')
export default class ExperienceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  companyName: string;

  @Column({ type: 'varchar', length: 255 })
  position: string;

  @Column({ type: 'varchar', length: 255 })
  startAt?: string;

  @Column({ type: 'varchar', length: 255 })
  endAt?: string;
}
