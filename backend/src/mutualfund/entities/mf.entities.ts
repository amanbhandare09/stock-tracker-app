import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { AMC } from "../../amc/entities/amc.entities";
import { FundStock } from "../../fundstock/entities/fundstock.entities";

@Entity("mutualfund")
export class MutualFund {
  @PrimaryGeneratedColumn("uuid")
  fund_id: string;

  @Column({ length: 255, unique: true })
  fund_name: string;

  @Column({ type: "uuid" })
  amc_id: string;

  @ManyToOne(() => AMC, amc => amc.mutualFunds)
  @JoinColumn({ name: "amc_id" })
  amc: AMC;

  @Column({ length: 50 })
  fund_type: string;

  @Column("decimal", { precision: 18, scale: 2, nullable: true })
  total_assets: number;

  @Column("decimal", { precision: 10, scale: 2, nullable: true })
  nav: number;

  @Column("decimal", { precision: 4, scale: 2, nullable: true })
  expense_ratio: number;

  @Column({ length: 255, nullable: true })
  manager_name: string;

  @Column({ type: "boolean", default: true })
  is_active: boolean;
  
  @OneToMany(() => FundStock, fundstock => fundstock.mutualfund)
  fundstock: FundStock[];
}
