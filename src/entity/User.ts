import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  getRepository
} from 'typeorm';
import DataLoader from 'dataloader';

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

export const userLoader: DataLoader<string, User> = new DataLoader<string, User>(ids => {
  const repo = getRepository(User);
  const users = repo.findByIds(ids);
  return users;
});
