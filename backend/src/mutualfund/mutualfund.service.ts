import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MutualFund } from './entities/mf.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMutualFundDto } from './dto/createmf.dto';
import { v4 as uuidv4 } from 'uuid';
import { AMC } from 'src/amc/entities/amc.entities';
import { FundStock } from 'src/fundstock/entities/fundstock.entities';
import { Stock } from 'src/stock/entities/stock.entities';


@Injectable()
export class MutualfundService {

  constructor(
    @InjectRepository(MutualFund) private readonly MfRepository: Repository<MutualFund>,
    @InjectRepository(AMC) private readonly AMCRepository: Repository<AMC>,
    @InjectRepository(FundStock) private readonly FundStockRepository: Repository<FundStock>,  
    @InjectRepository(Stock) private readonly stockRepository: Repository<Stock>,
  ) { }

  async createMutualFund(createMutualFundDto: CreateMutualFundDto): Promise<MutualFund> {
    const { fund_name, amc_short_name, fund_type } = createMutualFundDto;

    try {
      const existingFund = await this.MfRepository.findOneBy({ fund_name });
      if (existingFund) {
        throw new ConflictException('Fund name already exists');
      }

      const amcDetails = await this.AMCRepository.findOneBy({ amc_short_name });
      if (!amcDetails) {
        throw new NotFoundException('AMC name not found');
      }

      const mutualFund = new MutualFund();
      mutualFund.fund_id = uuidv4();
      mutualFund.amc_id = amcDetails.amc_id;
      mutualFund.fund_name = fund_name;
      mutualFund.fund_type = fund_type;

      return await this.MfRepository.save(mutualFund);
    } catch (err) {
      throw err;
    }
  }

  async findAll(): Promise<MutualFund[]> {
    try {
      return await this.MfRepository.find({
        relations: {
          fundstock: {
            stock: true
          }
        }
      });
    } catch (err) {
      console.error('Error fetching mutual funds:', err);
      throw new InternalServerErrorException('Failed to fetch mutual funds');
    }
  }

  findbyID(fund_id: string): Promise<MutualFund> {
    try {
      return this.MfRepository.findOneBy({ fund_id })

    } catch (err) {
      console.error('Error fetching mutual fund by id:', err);
      throw new InternalServerErrorException('Failed to fetch mutual funds');
    }
  }

  Delete(fund_id: string) {
    return this.MfRepository.delete({ fund_id })
  }

  async getMutualFundStocks(fund_id: string) {
    try {
      const stocks = await this.FundStockRepository
        .createQueryBuilder('f')
        .innerJoinAndSelect('stock', 's', 's.stock_id = f.stock_id')
        .select(['s.stock_name', 's.stock_id','f.shares_held','f.holding_percentage','s.close','s.market_cap'])
        .where('f.fund_id = :fund_id', { fund_id })
        .getRawMany();

      if (stocks.length === 0) {
        throw new NotFoundException('No stocks found for the given fund');
      }

      return stocks;
    } catch (err) {
      if (err instanceof InternalServerErrorException) {
        throw new InternalServerErrorException(err.message);
      } else {
        throw new InternalServerErrorException('An unexpected error occurred');
      }
    }
  }


  async updateAllTotalAssets() {
    console.log("Starting update for all mutual funds");
  
    try {
      // Retrieve all mutual funds
      const mutualFunds = await this.MfRepository.find();
  
      if (!mutualFunds || mutualFunds.length === 0) {
        throw new NotFoundException('No mutual funds found');
      }
  
      // Iterate over each mutual fund
      for (const mutualFund of mutualFunds) {
        const mf_id = mutualFund.fund_id;
        console.log(`Processing mutual fund ID: ${mf_id}`);
        
        // Retrieve all stocks for the current mutual fund
        const stocks = await this.FundStockRepository.find({ where: { fund_id: mf_id } });
  
        if (!stocks || stocks.length === 0) {
          console.log(`No stocks found for mutual fund ID: ${mf_id}`);
          continue;
        }
  
        // Calculate the sum of market caps
        let sum: number = 0;
        for (const stock of stocks) {
          const stockDetails = await this.stockRepository.findOneBy({ stock_id: stock.stock_id });
  
          // Check if stockDetails is defined
          if (stockDetails && !isNaN(stockDetails.market_cap)) {
            const marketCap = Number(stockDetails.market_cap);
            sum += marketCap;
          } else {
            console.log(`Stock details not found or market cap is invalid for stock ID: ${stock.stock_id}`);
            continue;
          }
        }
  
        // Log for debugging
        console.log(`Total market cap sum for mutual fund ID ${mf_id}: ${sum}`);
  
        // Update the total assets in the database
        await this.MfRepository.update(mf_id, { total_assets: sum });
      }
  
      console.log("Update completed for all mutual funds");
  
    } catch (err) {
      console.error('Error in updateAllTotalAssets:', err);
      throw new InternalServerErrorException('An error occurred while updating total assets');
    }
  }
}  


