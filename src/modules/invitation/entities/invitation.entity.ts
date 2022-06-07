import UserEntity from 'src/modules/auth/entity/user.entity';
import JobEntity from 'src/modules/jobs/entities/job.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('invitations')
export default class InvitationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'ownerId' })
  ownerId: UserEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'freelancerId' })
  freelancerId: UserEntity;

  @ManyToOne(() => JobEntity)
  @JoinColumn({ name: 'jobId' })
  jobId: JobEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;
}
