import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export default class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  categoryName: string;
}
