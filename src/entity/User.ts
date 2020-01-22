import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  getRepository
} from 'typeorm';

@Entity('users', {
  synchronize: true
})
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  password: string;

  @Index()
  @Column({ unique: true, length: 255 })
  username!: string;

  @Index()
  @Column({ unique: true, length: 255 })
  email!: string;

  @Column('timestampz')
  @CreateDateColumn()
  created_at!: Date;

  @Column('timestamptz')
  @UpdateDateColumn()
  updated_at!: Date;

  @Column({ default: false })
  is_certified!: boolean;
}
