import JobEntity from 'src/modules/jobs/entities/job.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'proposals' })
export default class ProposalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => JobEntity, { nullable: false })
  @JoinColumn({ name: 'jobId' })
  jobId: JobEntity;

  @Column({ type: 'integer' })
  freelancerId: number;

  @Column({ type: 'integer' })
  hourRate: number;

  @Column({ type: 'varchar' })
  coverLetter: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;
}
