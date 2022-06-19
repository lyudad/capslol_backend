/* eslint-disable @typescript-eslint/no-explicit-any */
import UserEntity from 'src/modules/auth/entity/user.entity';
import ChatContactEntity from 'src/modules/chat-contacts/entities/chat-contact.entity';
import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('messages')
export default class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (users: UserEntity) => users.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'senderId' })
  senderId: UserEntity;

  @Column({ type: 'varchar', length: 1000 })
  content: string;

  @ManyToOne(() => ChatContactEntity, (chats: ChatContactEntity) => chats.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'roomId' })
  roomId: ChatContactEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @Column({ type: 'boolean', default: false })
  isOffer: boolean;
}
