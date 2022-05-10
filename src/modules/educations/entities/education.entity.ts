import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('educations')
export default class EducationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  specialization: string;

  @Column({ type: 'varchar', length: 255 })
  startAt?: string;

  @Column({ type: 'varchar', length: 255 })
  endAt?: string;
}
