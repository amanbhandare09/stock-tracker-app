import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FundStock } from './entities/fundstock.entities';
import { CreateFundStockDto } from './dto/createfs.dto';
// import { UpdateFundStockDto } from './dto/updatefs.dto';
import {v4 as uuidv4} from "uuid"
import { MutualFund } from 'src/mutualfund/entities/mf.entities';
import { Stock } from 'src/stock/entities/stock.entities';
@Injectable()
export class FundstockService {
    constructor(
        @InjectRepository(FundStock) private readonly FundStockRepository: Repository<FundStock>,
        @InjectRepository(MutualFund) private readonly MutualfundRepository: Repository<MutualFund>,
        @InjectRepository(Stock) private readonly stockRepository: Repository<Stock>,
    ) {}

    async createFundStock(createFundStockDto: CreateFundStockDto): Promise<FundStock> {
        const { fund_name, isin_id, holding_percentage, shares_held, month_year } = createFundStockDto;
    
        try {
          // Retrieve fund and stock details
          const fundDetails = await this.MutualfundRepository.findOneBy({ fund_name });
          const stockDetails = await this.stockRepository.findOneBy({ isin_id });
    
          if (!fundDetails) {
            throw new NotFoundException(`Mutual fund with name "${fund_name}" not found`);
          }
          if (!stockDetails) {
            throw new NotFoundException(`Stock with name "${isin_id}" not found`);
          }
    
          const fund_id = fundDetails.fund_id;
          const stock_id = stockDetails.stock_id;
    
          // Check for existing FundStock entry
          const existFundStock = await this.FundStockRepository.findOneBy({ fund_id, stock_id, is_active:true });
    
          if (existFundStock) {
            throw new ConflictException('Fund stock entry already exists');
          }
    
          // Create and save new FundStock entry
          const fundstock = new FundStock();
          fundstock.fund_id = fund_id;
          fundstock.holding_percentage =isNaN(holding_percentage) ? 0 : holding_percentage;
          fundstock.shares_held = isNaN(shares_held) ? 0 : shares_held;
          fundstock.stock_id = stock_id;
          fundstock.fundstock_id = uuidv4();
          fundstock.month_year = month_year;
    
          return await this.FundStockRepository.save(fundstock);
    
        } catch (err) {
          
          throw err;
        }
      }
    

    removeFundStock(fund_id: string): Promise<{affected?: number}> {
        return this.FundStockRepository.delete({fund_id});
    }
}
