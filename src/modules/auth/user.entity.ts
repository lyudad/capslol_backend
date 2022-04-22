import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export default class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'thomas.anderson@matrix.com' })
  @Column()
  email: string;

  @ApiProperty({ example: 'neo', description: 'The One' })
  @Column()
  username: string;

  @ApiProperty({ example: 'zion-20', description: 'password must contain at least one character one number' })
  @Column()
  password: string;
}
