import UserEntity from 'src/modules/auth/entity/user.entity';
import JobEntity from 'src/modules/jobs/entities/job.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Status from '../types/ offer.type';

@Entity('offers')
export default class OfferEntity {
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

  @Column({ type: 'integer' })
  hourRate: number;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;
}
