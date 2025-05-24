import {PrimaryGeneratedColumn, Column} from "typeorm";

export class Overlap{

    @PrimaryGeneratedColumn("uuid")
    fundstock_id: string;

    @Column({ type: "uuid" })
    fund_id: string;

    @Column({ type: "uuid" })
    stock_id: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    stock_name: string;
}