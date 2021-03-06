import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  getRepository
} from 'typeorm';
import User from './User';

@Entity('user_profiles', {
  synchronize: true
})
export default class UserProfile {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 255 })
  display_name!: string;

  @Column({ length: 255 })
  short_bio!: string;

  @Column({ length: 255, nullable: true })
  thumbnail!: string;

  @Column('timestampz')
  @CreateDateColumn()
  created_at!: Date;

  @Column('timestamptz')
  @UpdateDateColumn()
  updated_at!: Date;

  @OneToOne(type => User, { cascade: true })
  @JoinColumn({ name: 'fk_user_id' })
  user!: User;

  @Column('uuid')
  fk_user_id!: string;

  @Column({
    default: {},
    type: 'jsonb'
  })
  profile_links!: any;

  @Column('text')
  about!: string;
}
