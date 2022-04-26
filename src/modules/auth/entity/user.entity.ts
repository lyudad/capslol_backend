import { hash } from 'bcrypt';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export default class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  firstName: string;

  @Column({ type: 'varchar', length: 50 })
  lastName: string;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'integer', width: 12, nullable: true })
  phoneNumber: number;

  @Column({ select: false })
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @BeforeInsert()
  async hashedPassword() {
    this.password = await hash(this.password, 10);
  }
}
