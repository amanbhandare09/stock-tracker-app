import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FundStock } from 'src/fundstock/entities/fundstock.entities';
import { MutualFund } from 'src/mutualfund/entities/mf.entities';
import { Stock } from 'src/stock/entities/stock.entities';
import { Repository } from 'typeorm';
import { searchFund } from './dto/search.dto'
@Injectable()
export class OverlapService {

  constructor(
    @InjectRepository(FundStock) private readonly fundStock: Repository<FundStock>,
    @InjectRepository(Stock) private readonly stock: Repository<Stock>,
    @InjectRepository(MutualFund) private readonly mutualFund: Repository<MutualFund>,
  ) { }
  async findStocks(fund_id1: string, fund_id2: string): Promise<any[]> {
    const stocksA = await this.stock
    .createQueryBuilder('s')
    .innerJoinAndSelect('fundstock', 'fs', 'fs.stock_id = s.stock_id')
    .select(['s.stock_id', 's.stock_name', 'fs.holding_percentage', 'fs.shares_held'])
    .where('fs.fund_id = :fund_id1', { fund_id1 })
    .andWhere('fs.is_active = :is_active', { is_active: true })
    .getRawMany();
  
    // console.log(stocksA);
    const stocksB = await this.stock
    .createQueryBuilder('s')
    .innerJoinAndSelect('fundstock', 'fs', 'fs.stock_id = s.stock_id')
    .select(['s.stock_id', 's.stock_name', 'fs.holding_percentage', 'fs.shares_held'])
    .where('fs.fund_id = :fund_id2', { fund_id2 })
    .andWhere('fs.is_active = :is_active', { is_active: true })
    .getRawMany();
    // console.log(stocksB);
    console.log("no od stocks in A :",stocksA.length)
    console.log("no od stocks in A :",stocksB.length)
    
    return [stocksA, stocksB];
  }


  async commonStocks(fund_id1: string, fund_id2: string): Promise<any[]> {

    const commonStocks = await this.stock
      .createQueryBuilder('s')
      .innerJoinAndSelect('fundstock', 'fs1', 'fs1.stock_id = s.stock_id')
      .innerJoinAndSelect('fundstock', 'fs2', 'fs2.stock_id = s.stock_id')
      .select(['s.stock_id', 's.stock_name', 'fs1.fundstock_id', 'fs1.holding_percentage', 'fs1.shares_held', 'fs2.fundstock_id', 'fs2.holding_percentage', 'fs2.shares_held'])
      .where('fs1.fund_id = :fund_id1', { fund_id1 })
      .andWhere('fs2.fund_id = :fund_id2', { fund_id2 })
      .andWhere('fs1.is_active = :is_active', { is_active: true })
      .andWhere('fs2.is_active = :is_active', { is_active: true })
      .getRawMany();

    console.log(commonStocks.length)
    return commonStocks;
  }


  async dataStocks(common: Array<any>,uncommon_A: Array<any>,uncommon_B: Array<any>): Promise<any> {

    const commonStocks = common.map(stock => {
      return {
        stock: stock.s_stock_name,
        overlap1: stock.fs1_holding_percentage,
        overlap2: stock.fs2_holding_percentage
      }
    });

    const uncommonStocks_A = uncommon_A.map(stock => {
      return {
        stock: stock.s_stock_name,
        overlap1: stock.fs_holding_percentage,
        overlap2: 0
      }
    });

    const uncommonStocks_B = uncommon_B.map(stock => {
      return {
        stock: stock.s_stock_name,
        overlap1: 0,
        overlap2: stock.fs_holding_percentage
      }
    });

    return [...commonStocks, ...uncommonStocks_A, ...uncommonStocks_B];

  }



  async searchmf(mf: string): Promise<searchFund[]> {

    try {
      const fundName = await this.mutualFund.query(
        `SELECT * FROM mutualfund WHERE fund_name ~* $1`,
        [`${mf}`]
      );
      return fundName.map((item) => ({ name: item.fund_name, id: item.fund_id }));
    } catch (err) {
      return err;
    }

  }

  calculation(allstocks: any, commonstocks: any): any {
    const totalpercentage = [
      parseInt(
        allstocks[0].reduce((total, stock) => {
          return total + parseFloat(stock.fs_holding_percentage);
        }, 0).toFixed(2)
      ),
      parseInt(
        allstocks[1].reduce((total, stock) => {
          return total + parseFloat(stock.fs_holding_percentage);
        }, 0).toFixed(2)
      )
    ];

    const total_stock = [
      allstocks[0].length,
      allstocks[1].length
    ]



    const commontotalpercentage = [
      parseInt(
        commonstocks.reduce((total, stock) => {
          return total + parseFloat(stock.fs1_holding_percentage);
        }, 0).toFixed(2)
      ),
      parseInt(
        commonstocks.reduce((total, stock) => {
          return total + parseFloat(stock.fs2_holding_percentage);
        }, 0).toFixed(2)
      )
    ];

    const commontotal_stock = commonstocks.length 

    const uncommon_stock = [total_stock[0] - commontotal_stock, total_stock[1] - commontotal_stock];

    const uncommon_percentage = [100 - commontotalpercentage[0], 100 - commontotalpercentage[1]];
    const overlap_percentage = (commontotalpercentage[0] + commontotalpercentage[1])/2;
    // console.log(totalpercentage, commontotalpercentage, uncommon_percentage, total_stock, commontotal_stock, uncommon_stock);

    return {
      totalpercentage: totalpercentage,
      commontotalpercentage: commontotalpercentage,
      uncommon_percentage: uncommon_percentage,
      total_stock: total_stock,
      commontotal_stock: commontotal_stock,
      uncommon_stock: uncommon_stock,
      overlap_percentage:overlap_percentage
    }
  }


  async SearchStockByName(ss: string): Promise<searchFund[]> {
    try {
      const StockNames = await this.stock.query(
        `SELECT * FROM stock WHERE stock_name ILIKE $1`,
        [`${ss}%`]
      );

      return StockNames.map((Item) => ({
        name: Item.stock_name,
        id: Item.stock_id,
      }));
    } catch (err) {
      console.error('Error in SearchStockByName:', err);
      throw new Error('Search failed');
    }
  }
  
}
