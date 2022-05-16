import PublicProfile from 'src/modules/public-profile/entities/public-profile.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('experiences')
export default class ExperienceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  companyName: string;

  @Column({ type: 'varchar', length: 255 })
  position: string;

  @Column({ type: 'varchar', length: 255 })
  startAt: string;

  @Column({ type: 'varchar', length: 255 })
  endAt: string;

  @ManyToOne(() => PublicProfile, (profile) => profile.experiense, {
    onDelete: 'SET NULL',
  })
  profile: PublicProfile;
}
