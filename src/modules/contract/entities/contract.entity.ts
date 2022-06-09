import UserEntity from 'src/modules/auth/entity/user.entity';
import JobEntity from 'src/modules/jobs/entities/job.entity';
import OfferEntity from 'src/modules/offer/entities/offer.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import ContractStatus from '../types/contract.type';

@Entity('contracts')
export default class ContractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => JobEntity)
  @JoinColumn({ name: 'jobId' })
  jobId: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'ownerId' })
  ownerId: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'freelancerId' })
  freelancerId: number;

  @ManyToOne(() => OfferEntity)
  @JoinColumn({ name: 'offerId' })
  offerId: number;

  @Column({
    type: 'enum',
    enum: ContractStatus,
    default: ContractStatus.OPENED,
  })
  status: ContractStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @Column({ type: 'timestamp', nullable: true })
  closedAt: string;
}
