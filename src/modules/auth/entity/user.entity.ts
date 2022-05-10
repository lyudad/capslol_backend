import { HttpException, HttpStatus } from '@nestjs/common';
import { hash } from 'bcrypt';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

enum Role {
  FREELANCER = 'Freelancer',
  JOBOWNER = 'Job Owner',
  NOSET = 'No set',
}

@Entity({ name: 'users' })
export default class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  firstName: string;

  @Column({ type: 'varchar', length: 50, default: '' })
  lastName: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.NOSET,
  })
  role: Role;

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
  @BeforeUpdate()
  async hashedPassword() {
    try {
      this.password = await hash(this.password, 10);
      if (this.password) {
        this.password = await hash(this.password, 10);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
