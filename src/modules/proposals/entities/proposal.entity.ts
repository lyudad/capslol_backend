import UserEntity from 'src/modules/auth/entity/user.entity';
import JobEntity from 'src/modules/jobs/entities/job.entity';
import {
  Column,
  Entity,
  JoinColumn,
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

  @OneToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: 'freelancerId' })
  freelancerId: UserEntity;

  @Column({ type: 'integer' })
  hourRate: number;

  @Column({ type: 'varchar' })
  coverLetter: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;
}
