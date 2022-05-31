import { HttpException, HttpStatus } from '@nestjs/common';
import { hash } from 'bcrypt';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../types/user.interface';

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
    nullable: true,
  })
  role: Role;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar', length: 25, nullable: true })
  phoneNumber: string;

  @Column({ select: false, nullable: true })
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  isGoogle: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  async hashedPassword(): Promise<void> {
    try {
      if (this.password) {
        this.password = await hash(this.password, 10);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
