import JobEntity from 'src/modules/jobs/entities/job.entity';
import PublicProfile from 'src/modules/public-profile/entities/public-profile.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('skills')
export default class SkillEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToMany(() => PublicProfile, (post: PublicProfile) => post.skills)
  post: PublicProfile[];

  @ManyToMany(() => JobEntity, (job: JobEntity) => job.skills)
  jobs: JobEntity[];
}
