import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('botstatus')
export class RpaBot {
  @PrimaryGeneratedColumn('increment')
  status_id: number;

  @Column({ length: 100, default: 'portfolio bot' })
  bot_name: string;

  @CreateDateColumn({ type: 'timestamp' })
  start_time: Date;

  @Column({ type: 'interval', nullable: true })
  execution_time: string | null;

  @Column({ type: 'text', default: 'Incomplete' })
  status: string;  // Use 'text' for detailed status logs
}