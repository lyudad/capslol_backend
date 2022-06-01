import UserEntity from 'src/modules/auth/entity/user.entity';
import JobEntity from 'src/modules/jobs/entities/job.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'proposals' })
export default class ProposalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => JobEntity, (jobs: JobEntity) => jobs.id, { nullable: false })
  @JoinColumn({ name: 'jobId' })
  jobId: JobEntity;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: 'freelancerId' })
  freelancerId: UserEntity;

  @Column({ type: 'integer' })
  hourRate: number;

  @Column({ type: 'varchar' })
  coverLetter: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;
}
