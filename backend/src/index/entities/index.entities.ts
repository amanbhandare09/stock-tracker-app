import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Indexstock } from '../../indexstock/entities/indexstock.entity'; // Adjust the import path as needed


@Entity('indices')
export class Index {
    @PrimaryGeneratedColumn('uuid')
    index_id: string;

    @Column({ length: 255 })
    index_name: string;

    @Column('float')
    open: number;

    @Column('float')
    close: number;

    @Column('float')
    ltp: number;

    @Column('float')
    w_h: number;

    @Column('float')
    w_l: number;

    @Column('varchar', { nullable: true })
    index_cat: string;

    @Column('boolean', { default: true })
    is_active: boolean;

    @OneToMany(() => Indexstock, indexstock => indexstock.index)
    indexstocks: Indexstock[];
}
