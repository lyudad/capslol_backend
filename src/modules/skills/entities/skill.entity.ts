import PublicProfile from 'src/modules/public-profile/entities/public-profile.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class SkillEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToMany(() => PublicProfile, (profile) => profile.skills)
  profiles: PublicProfile[];
}
