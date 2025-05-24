import { Index } from "src/index/entities/index.entities";
import { Stock } from "src/stock/entities/stock.entities";
import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";

@Entity("indexstock")
export class Indexstock {
    @PrimaryGeneratedColumn("uuid")
    indexstock_id: string;
  
    @ManyToOne(() => Index, index => index.indexstocks)
    @JoinColumn({ name: "index_id" })
    index: Index;

    @ManyToOne(() => Stock, stock => stock.fundstock)
    @JoinColumn({ name: "stock_id" })
    stock: Stock;
}
