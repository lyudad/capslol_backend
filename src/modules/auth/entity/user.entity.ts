import { hash } from 'bcrypt';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export default class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  firstName: string;

  @Column({ type: 'varchar', length: 50, default: '' })
  lastName: string;

  @Column({ type: 'integer', width: 1, nullable: true })
  role: number;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'integer', width: 12, nullable: true })
  phoneNumber: number;

  @Column({ select: false, nullable: true })
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  isGoogle: boolean;

  @BeforeInsert()
  async hashedPassword() {
    if (this.password) {
      this.password = await hash(this.password, 10);
    }
  }
}
