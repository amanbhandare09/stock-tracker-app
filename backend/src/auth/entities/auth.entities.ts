import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users_admin')
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  password: string;

  @Column({ type: 'varchar', length: 255, enum: ['user', 'admin'], nullable: true })
  role: 'user' | 'admin';
}
