import ProposalEntity from 'src/modules/proposals/entities/proposal.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('chat-contacts')
export default class ChatContactEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => ProposalEntity,
    (proposals: ProposalEntity) => proposals.id,
    {
      nullable: false,
    },
  )
  @JoinColumn({ name: 'proposalId' })
  proposalId: ProposalEntity;

  @Column({ type: 'boolean', nullable: true, default: false })
  isActive: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;
}
