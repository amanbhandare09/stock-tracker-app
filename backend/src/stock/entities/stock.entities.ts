import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {FundStock} from '../../fundstock/entities/fundstock.entities';
import { Indexstock } from 'src/indexstock/entities/indexstock.entity';

@Entity('stock')
export class Stock {
  @PrimaryGeneratedColumn('uuid')
  stock_id: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  isin_id: string;

  @Column({ type: 'varchar', length: 10 })
  stock_symbol: string;

  @Column({ type: 'varchar', length: 255 })
  stock_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  sector: string;

  @Column({ type: 'numeric', precision: 18, scale: 2, nullable: true })
  market_cap: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  open: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  close: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  w_h: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  w_l: number;

  @Column({ type: 'varchar', length: 50 })
  exchange: string;

  @OneToMany(() => FundStock, fundstock => fundstock.stock)
  fundstock: FundStock[];

  @OneToMany(() => Indexstock, indexstock => indexstock.stock)
  indexstock: Indexstock[];
}
