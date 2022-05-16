import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('skills')
export default class SkillEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;
}
