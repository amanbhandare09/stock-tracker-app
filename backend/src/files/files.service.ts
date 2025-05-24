import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as csv from 'csv-parser';
import { join } from 'path';
import { MutualfundService } from '../mutualfund/mutualfund.service'; // Adjust path if needed
import { InjectRepository } from '@nestjs/typeorm';
import { MutualFund } from '../mutualfund/entities/mf.entities'; // Adjust path if needed
import { Repository } from 'typeorm';
import { FundstockService } from 'src/fundstock/fundstock.service';
import { Stock } from 'src/stock/entities/stock.entities';
import { FundStock } from 'src/fundstock/entities/fundstock.entities';
import { AMC } from 'src/amc/entities/amc.entities';
import { AmcService } from 'src/amc/amc.service';
import { StockService } from 'src/stock/stock.service';

import * as dotenv from 'dotenv';
import { Index } from 'src/index/entities/index.entities';
import { Indexstock } from 'src/indexstock/entities/indexstock.entity';
import { IndexService } from 'src/index/index.service';
import { IndexstockService } from 'src/indexstock/indexstock.service';
dotenv.config();

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(MutualFund)
    private readonly mutualFundRepository: Repository<MutualFund>,
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
    @InjectRepository(FundStock)
    private readonly fundStockRepository: Repository<FundStock>,
    @InjectRepository(AMC)
    private readonly amcrepository: Repository<AMC>,
    @InjectRepository(Index)
    private readonly indexrepository: Repository<Index>,
    @InjectRepository(Indexstock)
    private readonly indexstockrepository: Repository<Indexstock>,

    private readonly mutualFundService: MutualfundService,
    private readonly fundstockService: FundstockService,
    private readonly amcService: AmcService,
    private readonly stockService: StockService,
    private readonly indexService: IndexService,
    private readonly indexStockService: IndexstockService,
  ) { };
  private normalizeKeys(row: any): any {
    const normalizedRow: any = {};
    for (const key in row) {
      // Remove quotes and trim whitespace
      const newKey = key.replace(/^['"]+|['"]+$/g, '').trim();
      const newValue = typeof row[key] === 'string' ? row[key].replace(/^['"]+|['"]+$/g, '').trim() : row[key];
      normalizedRow[newKey] = newValue;
    }
    return normalizedRow;
  }
  async addAMCtoDb(): Promise<string[]> {
    try {
      const directoryPath = process.env.AMC;
      const files = await fs.readdir(directoryPath);
      const csvFiles = files.filter(file => file.endsWith('.csv'));
      const results: string[] = [];

      for (const file of csvFiles) {
        const filePath = join(directoryPath, file);

        // Await the processing of each file
        await new Promise<void>((resolve, reject) => {
          const rows: any[] = []; // Specify the type if needed

          console.log(`Starting file read: ${filePath}`);

          // Create a read stream and parse the CSV
          fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
              const normalizedRow = this.normalizeKeys(row);
              console.log('Reading row:', row);
              rows.push(normalizedRow);
            })
            .on('end', async () => {
              console.log('File read completed. Processing rows...');
              try {
                // Process each row
                for (const row of rows) {
                  const existingAmc = await this.amcrepository.findOneBy({ amc_name: row.amc_name });
                  if (existingAmc) {
                    console.log(`AMC already exists: ${row.amc_name}`);
                    continue;
                  }

                  const amcData = {
                    amc_name: row.amc_name,
                    amc_short_name: row.amc_short_name,
                    mf_offered: 0,
                  };

                  // Use the AMC service to create a new AMC
                  await this.amcService.createAMC(amcData);
                }
                console.log('All rows processed successfully.');
                resolve();
              } catch (error) {
                console.error('Error during processing:', error);
                reject(error); // Propagate the error
              }
            })
            .on('error', (error) => {
              console.error('Error reading file:', error);
              reject(error); // Handle file read errors
            });
        });

        results.push(filePath);
      }

      return results;
    } catch (error) {
      throw error;
    }
  }

  async addStocktoDb(): Promise<string[]> {
    const directoryPath = process.env.STOCK_PATH;
    try {
      const files = await fs.promises.readdir(directoryPath);
      const csvFiles = files.filter(file => file.endsWith('.csv'));
      const results: string[] = [];

      for (const file of csvFiles) {
        const filePath = join(directoryPath, file);

        await new Promise<void>((resolve, reject) => {
          const rows: any[] = [];

          console.log(`Starting file read: ${filePath}`);

          fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
              // Normalize keys
              const normalizedRow = this.normalizeKeys(row);
              rows.push(normalizedRow);
            })
            .on('end', async () => {
              try {
                for (const row of rows) {
                  const existingStock = await this.stockRepository.findOneBy({ isin_id: row.isin });
                  if (existingStock) {

                    continue;
                  }

                  const stockData = {
                    isin_id: row.isin,
                    stock_symbol: row.stock_symbol,
                    stock_name: row.stock_name,
                    sector: row.sector,
                    market_cap: parseFloat(row.market_cap),
                    exchange: "nse",
                  };

                  await this.stockService.create(stockData);
                }

                resolve();
              } catch (error) {
                reject(error);
              }
            })
            .on('error', (error) => {
              reject(error);
            });
        });

        results.push(filePath);
      }

      return results;
    } catch (error) {
      throw error;
    }
  }

  async addFundStocktoDb(): Promise<any> {
    // Add your code here
    try {
      const directoryPath = process.env.FUNDSTOCK_MUTUALFUND_PATH;
      const files = await fs.readdir(directoryPath);
      const csvFiles = files.filter(file => file.endsWith('.csv'));
      const results: string[] = [];

      for (const file of csvFiles) {
        const filePath = join(directoryPath, file);

        await new Promise<void>((resolve, reject) => {
          const results: any[] = []; // Specify type if needed

          console.log(`Starting file read: ${filePath}`);

          fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
              const normalizedRow = this.normalizeKeys(row);
              console.log('Reading row:', row);
              results.push(normalizedRow);
            })
            .on('end', async () => {
              console.log('File read completed. Processing rows...');
              try {
                for (const row of results) {
                  const fundDetails = await this.mutualFundRepository.findOneBy({ fund_name: row.fund_name });
                  const stockDetails = await this.stockRepository.findOneBy({ isin_id: row.isin });
                  if (!fundDetails || !stockDetails) {
                    console.error(`Fund or stock not found for row: ${JSON.stringify(row)}`);
                    continue;
                  }

                  const fund_id = fundDetails.fund_id;
                  const stock_id = stockDetails.stock_id;
                  const existFundStock = await this.fundStockRepository.findOneBy({ fund_id, stock_id, is_active: true });
                  if (existFundStock) {
                    console.log(`Fund stock entry already exists for fund: ${row.fund_name} and stock: ${row.isin}`);
                    continue;
                  }

                  console.log("Processing fund stock entry for:", row);
                  const fundStockData = {
                    isin_id: row.isin,
                    fund_name: row.fund_name,
                    holding_percentage: parseFloat(parseFloat(row.holding_percentage).toFixed(2)),
                    shares_held: parseInt(row.quantity),
                    month_year: row.month_year,
                  };
                  await this.fundstockService.createFundStock(fundStockData);
                }
                console.log('All rows processed successfully.');
                resolve();
              } catch (error) {
                console.error('Error during processing:', error);
                reject(error); // Propagate the error
              }
            })
            .on('error', (error) => {
              console.error('Error reading file:', error);
              reject(error); // Handle file read errors
            });
        });

        results.push(filePath);
      }

      return results;
    } catch (error) {
      throw error;
    }
  }

  async addFundtoDb(): Promise<any> {

    try {
      const directoryPath = process.env.FUNDSTOCK_MUTUALFUND_PATH;
      const files = await fs.readdir(directoryPath);
      const csvFiles = files.filter(file => file.endsWith('.csv'));
      const results: string[] = [];

      for (const file of csvFiles) {
        const filePath = join(directoryPath, file);

        await new Promise<void>((resolve, reject) => {
          const rows: any[] = []; // Specify the type if needed

          console.log(`Starting file read: ${filePath}`);

          // Create a read stream and parse the CSV
          fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
              const normalizedRow = this.normalizeKeys(row);
              console.log('Reading row:', row);
              rows.push(normalizedRow);
            })
            .on('end', async () => {
              console.log('File read completed. Processing rows...');
              try {
                // Process each row
                for (const row of rows) {
                  const existingfund = await this.mutualFundRepository.findOneBy({ fund_name: row.fund_name });
                  const existingamc = await this.amcrepository.findOneBy({ amc_short_name: row.amc_short_name });
                  if (existingfund ) {
                    console.log(`Fund already exists: ${row.amc_name}`);
                    continue;
                  }
                  if (!existingamc) {
                    console.error(`AMC not found: ${row.amc_short_name}`);
                    continue;
                  }

                  const fundData = {
                    fund_name: row.fund_name,
                    amc_short_name: row.amc_short_name,
                    fund_type: row.fund_type,
                  };

                  // Use the AMC service to create a new AMC
                  await this.mutualFundService.createMutualFund(fundData);
                }
                console.log('All rows processed successfully.');
                resolve();
              } catch (error) {
                console.error('Error during processing:', error);
                reject(error); // Propagate the error
              }
            })
            .on('error', (error) => {
              console.error('Error reading file:', error);
              reject(error); // Handle file read errors
            });
        });

        results.push(filePath);
      }

      return results;
    } catch (error) {
      throw error;
    }
  }

  async deactivateFundStockData(): Promise<void> {
    try {
      await this.fundStockRepository.update({}, { is_active: false });
    } catch (error) {
      // Log the error using your custom logger
      // this.logger.error('Failed to deactivate fund stock data', error.stack);
      throw error;
    }
  }

  async deactivateFundData(fund_name: string): Promise<void> {
    try {
      await this.mutualFundRepository.update({ fund_name: fund_name }, { is_active: false });
    } catch (error) {
      // Log the error using your custom logger
      // this.logger.error('Failed to deactivate fund stock data', error.stack);
      throw error;
    }
  }

  async updateStockData(): Promise<any> {
    // Add your code here
    try {
      const directoryPath = process.env.UPDATE_STOCK_PATH;
      const files = await fs.readdir(directoryPath);
      const csvFiles = files.filter(file => file.endsWith('.csv'));
      const results: string[] = [];

      for (const file of csvFiles) {
        const filePath = join(directoryPath, file);

        await new Promise<void>((resolve, reject) => {
          const rows: any[] = []; // Specify the type if needed

          console.log(`Starting file read: ${filePath}`);

          // Create a read stream and parse the CSV
          fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
              const normalizedRow = this.normalizeKeys(row);
              console.log('Reading row:', row);
              rows.push(normalizedRow);
            })
            .on('end', async () => {
              console.log('File read completed. Processing rows...');
              try {
                // Process each row
                for (const row of rows) {
                  const existingStock = await this.stockRepository.findOneBy({ stock_symbol: row.stock });
                  if (!existingStock) {
                    console.log(`Stock not found: ${row.isin_id}`);
                    continue;
                  }

                  const stock_data = {
                    isin_id: existingStock.isin_id,
                    open: 0,
                    close: row.current_price,
                    w_l: 0,
                    w_h: row.high_52_week,
                  };
 
                  // Use the AMC service to create a new AMC
                  await this.stockService.updateStocksData(stock_data);
                }
                console.log('All rows processed successfully.');
                resolve();
              } catch (error) {
                console.error('Error during processing:', error);
                reject(error); // Propagate the error
              }
            })
            .on('error', (error) => {
              console.error('Error reading file:', error);
              reject(error); // Handle file read errors
            });
        });

        results.push(filePath);
      }

      return results;
    } catch (error) {
      throw error;
    }
  }

  async addFortnightlyData(): Promise<any> {
    try {
      const directoryPath = process.env.FORTNIGHTY_PATH;
      const files = await fs.readdir(directoryPath);
      const csvFiles = files.filter(file => file.endsWith('.csv'));
      const results: string[] = [];

      for (const file of csvFiles) {
        const filePath = join(directoryPath, file);

        await new Promise<void>((resolve, reject) => {
          const results: any[] = []; // Specify type if needed

          console.log(`Starting file read: ${filePath}`);

          fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
              const normalizedRow = this.normalizeKeys(row);
              results.push(normalizedRow);
            })
            .on('end', async () => {
              console.log('File read completed. Processing rows...');
              try {
                for (const row of results) {
                  const fundName = row.fund_name;

                  const fundetails = await this.mutualFundRepository.findOneBy({ fund_name: fundName });

                  if (!fundetails) {
                    console.error(`Fund not found: ${fundName}`);
                    continue;
                  }

                  const fund_id = fundetails.fund_id;
                  const fundstockDetails = await this.fundStockRepository.findOneBy({fund_id});
                  console.log('here')
                  console.log(fundstockDetails);

                  if(fundstockDetails===null){
                    continue;
                  }
                  if(!fundstockDetails.is_active){
                    continue;
                  }

                  await this.fundStockRepository.update({fund_id: fundetails.fund_id}, {is_active: false});
                  
                }

                for (const row of results) {
                  const fundDetails = await this.mutualFundRepository.findOneBy({ fund_name: row.fund_name });
                  const stockDetails = await this.stockRepository.findOneBy({ isin_id: row.isin });
                  if (!fundDetails || !stockDetails) {
                    console.error(`Fund or stock not found for row: ${JSON.stringify(row)}`);
                    continue;
                  }

                  const fund_id = fundDetails.fund_id;
                  const stock_id = stockDetails.stock_id;
                  const existFundStock = await this.fundStockRepository.findOneBy({ fund_id, stock_id, is_active: true });
                  if (existFundStock) {
                    console.log(`Fund stock entry already exists for fund: ${row.fund_name} and stock: ${row.isin}`);
                    continue;
                  }

                  console.log("Processing fund stock entry for:", row);
                  const fundStockData = {
                    isin_id: row.isin,
                    fund_name: row.fund_name,
                    holding_percentage: parseFloat(parseFloat(row.holding_percentage).toFixed(2)),
                    shares_held: parseInt(row.quantity),
                    month_year: row.month_year,
                  };
                  await this.fundstockService.createFundStock(fundStockData);
                }

                console.log('All rows processed successfully.');
                resolve();
              } catch (error) {
                console.error('Error during processing:', error);
                reject(error); // Propagate the error
              }
            })
            .on('error', (error) => {
              console.error('Error reading file:', error);
              reject(error); // Handle file read errors
            });
        });

        results.push(filePath);
      }

      return results;
    } catch (error) {
      throw error;
    }
  }


  async addIndexData(): Promise<any> {
    try {
      const directoryPath = process.env.INDEX_PATH;
      const files = await fs.readdir(directoryPath);
      const csvFiles = files.filter(file => file.endsWith('.csv'));
      const results: string[] = [];

      for (const file of csvFiles) {
        const filePath = join(directoryPath, file);

        await new Promise<void>((resolve, reject) => {
          const results: any[] = []; // Specify type if needed

          console.log(`Starting file read: ${filePath}`);

          fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
              const normalizedRow = this.normalizeKeys(row);
              console.log('Reading row:', row);
              results.push(normalizedRow);
            })
            .on('end', async () => {
              console.log('File read completed. Processing rows...');
              try {
                for (const row of results) {
                  const index_name = row.indice_name;
                  const index_exist = await this.indexrepository.findOneBy({index_name ,is_active: true});

                  if(index_exist){
                    console.log(`Index already exists: ${row.indice_name}`);
                    continue;
                  }
                  const indexData = {
                    index_name: row.indice_name,
                    open: row.open,
                    close: row.close,
                    ltp: row.ltp,
                    w_h: row.w_h,
                    w_l: row.w_l,
                    index_cat: row.indice_category,
                    is_active: true
                  }
                  await this.indexService.createIndexes(indexData);
                }
                console.log('All rows processed successfully.');
                resolve();
              } catch (error) {
                console.error('Error during processing:', error);
                reject(error); // Propagate the error 
              }
            })
            .on('error', (error) => {
              console.error('Error reading file:', error);
              reject(error); // Handle file read errors
            });
        });

        results.push(filePath);
      }

      return results;
    } catch (error) {
      throw error;
    }
  }

  async addIndexStockData(): Promise<any> {
    try {
      const directoryPath = process.env.INDEX_PATH
      const files = await fs.readdir(directoryPath);
      const csvFiles = files.filter(file => file.endsWith('.csv'));
      const results: string[] = [];

      for (const file of csvFiles) {
        const filePath = join(directoryPath, file);

        await new Promise<void>((resolve, reject) => {
          const results: any[] = []; // Specify type if needed

          console.log(`Starting file read: ${filePath}`);

          fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
              const normalizedRow = this.normalizeKeys(row);
              // console.log('Reading row:', row);
              results.push(normalizedRow);
            })
            .on('end', async () => {
              console.log('File read completed. Processing rows...');
              try {
                for (const row of results) {
                  const index_name = row.indice_name;
                  const stock_symbol = row.symbol;
                  console.log(stock_symbol)
                  const index_exist = await this.indexrepository.findOneBy({ index_name , is_active: true });
                  const stock_exist = await this.stockRepository.findOneBy({ stock_symbol });
                  console.log(stock_exist)
                  if (!index_exist || !stock_exist) {
                    console.error(`Index or Stock not found: ${index_name} or ${stock_symbol}`);
                    continue;
                  }

                  const StockData = {
                    isin_id: stock_exist.isin_id,
                    open: row.open,
                    close: row.close,
                    w_h: row.w_h,
                    w_l: row.w_l,
                  }
                  await this.stockService.updateStocksData(StockData);


                  const valid = await this.indexStockService.Validate(index_exist.index_id, stock_exist.stock_id);
                  if(valid){
                    continue;
                  }

                  const indexStockdata = {
                    index_id: index_exist.index_id,
                    stock_id: stock_exist.stock_id,
                  }
                  await this.indexStockService.CreateindexStock(indexStockdata);
                }
                console.log('All rows processed successfully.');
                resolve();
              } catch (error) {
                console.error('Error during processing:', error);
                reject(error); // Propagate the error
              }
            })
            .on('error', (error) => {
              console.error('Error reading file:', error);
              reject(error); // Handle file read errors
            });
        });

        results.push(filePath);
      }

      return results;
    } catch (error) {
      throw error;
    }
  }

}
