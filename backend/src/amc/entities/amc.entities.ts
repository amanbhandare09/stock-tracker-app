import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { MutualFund } from "../../mutualfund/entities/mf.entities";

@Entity("amc")
export class AMC {
  @PrimaryGeneratedColumn("uuid")
  amc_id: string;

  @Column({ length: 255 ,unique:true})
  amc_name: string;

  @Column({ length: 255, default: null })
  amc_short_name: string | null;


  @Column("int")
  mf_offered: number;

  @OneToMany(() => MutualFund, mutualFund => mutualFund.amc)
  mutualFunds: MutualFund[];
}
