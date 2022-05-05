import PublicProfile from 'src/modules/public-profile/entities/public-profile.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  //   JoinColumn,
  ManyToOne,
  OneToMany,
  //   JoinColumn,
  //   ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('experience')
export default class ExperienceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @OneToMany(
  //   () => PublicProfile,
  //   (profile: PublicProfile) => profile.experienses,
  // )
  // profile: PublicProfile;

  //   @ManyToOne(() => PublicProfile)
  //   profile: PublicProfile;
  //   @JoinColumn({
  //     name: 'id',
  //     // referencedColumnName: 'id',
  //   })
  //   countryId: PublicProfile;
  @Column({ type: 'varchar', length: 255 })
  company_name: string;

  @Column({ type: 'varchar', length: 255 })
  position: string;

  @CreateDateColumn({ type: 'timestamp' })
  start_at?: string;

  @CreateDateColumn({ type: 'timestamp' })
  end_at?: string;
}
