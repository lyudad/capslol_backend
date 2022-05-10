import PublicProfile from 'src/modules/public-profile/entities/public-profile.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('skills')
export default class SkillEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => PublicProfile, (post: PublicProfile) => post.skills)
  post: PublicProfile[];

  @Column({ type: 'varchar', length: 255 })
  name: string;
}
