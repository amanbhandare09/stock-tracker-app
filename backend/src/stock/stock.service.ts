import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from './entities/stock.entities';
import { CreateStockDto } from './dto/createstock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { MutualFund } from 'src/mutualfund/entities/mf.entities';
import { FundStock } from 'src/fundstock/entities/fundstock.entities';

import { v4 as uuidv4 } from "uuid"


@Injectable()
export class StockService {

  constructor(
    @InjectRepository(Stock) private readonly stockRepository: Repository<Stock>,
    @InjectRepository(FundStock) private readonly fundstockRepository: Repository<FundStock>,
    @InjectRepository(MutualFund) private readonly mutualFundRepository: Repository<MutualFund>,

  ) { }

  async findAll(): Promise<Stock[]> {
    try {
      return this.stockRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findById(stockID: string): Promise<Stock> {
    try {
      const stock = this.stockRepository.findOneBy({ stock_id: stockID });
      if (!stock) {
        throw new NotFoundException('stock not found');
      }
      return stock;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async create(createStockDto: CreateStockDto): Promise<Stock> {
    const { stock_name, isin_id, stock_symbol, sector, market_cap, exchange } = createStockDto;

    try {
      // Check if stock already exists
      const existingStock = await this.stockRepository.findOneBy({ isin_id });
      if (existingStock) {
        throw new ConflictException('Stock name already exists');
      }

      // Create new stock
      const newStock = this.stockRepository.create({
        stock_id: uuidv4(),
        isin_id,
        stock_name,
        stock_symbol,
        sector,
        market_cap,
        exchange,
      });

      return await this.stockRepository.save(newStock);
    } catch (error) {
      throw error;
    }
  }

  async delete(stock_id: string): Promise<void> {
    try {
      const result = await this.stockRepository.delete(stock_id);
      if (result.affected === 0) {
        throw new NotFoundException('Stock not found');
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findMutualFundsByStockId(stockId: string): Promise<MutualFund[]> {
    try {
      const fundStocks = await this.fundstockRepository.find({
        where: { stock_id: stockId },
        relations: ['mutualfund'],
      });

      const mutualFundIds = fundStocks.map(fundStock => fundStock.mutualfund.fund_id);
      return this.mutualFundRepository.findByIds(mutualFundIds);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateStocksData(updateStockDto: UpdateStockDto): Promise<void> {
    try {
      const { isin_id } = updateStockDto;
  
      const stockDetails = await this.stockRepository.findOneBy({ isin_id });
      if (!stockDetails) {
        throw new Error('Stock not found');
      }
  

      await this.stockRepository.update({ isin_id }, updateStockDto);
    } catch (error) {
      throw error;
    }
  }
}
