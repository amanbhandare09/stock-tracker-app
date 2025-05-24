import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { MutualFund } from "../../mutualfund/entities/mf.entities";
import { Stock } from "src/stock/entities/stock.entities";

@Entity("fundstock")
export class FundStock {
  @PrimaryGeneratedColumn("uuid")
  fundstock_id: string;

  @Column({ type: "uuid" })
  fund_id: string;
  
  @Column({ type: "uuid" })
  stock_id: string;

  @Column({ type: "decimal", nullable:true })
  shares_held: number;

  @Column({ type: "text", nullable:true })
  month_year: string;

  @Column({ type: "decimal" })
  holding_percentage: any;

  @Column({ type: "boolean", nullable: true, default: true })
  is_active: boolean;

  @ManyToOne(() => MutualFund, mutualfund => mutualfund.fundstock)
  @JoinColumn({ name: "fund_id" })
  mutualfund: MutualFund;

  @ManyToOne(() => Stock, stock => stock.fundstock)
  @JoinColumn({ name: "stock_id" })
  stock: Stock;
}
