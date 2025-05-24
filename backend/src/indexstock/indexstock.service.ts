import { ConflictException, Injectable } from '@nestjs/common';
import { CreateIndexstockDto } from './dto/create-indexstock.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Indexstock } from './entities/indexstock.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Stock } from 'src/stock/entities/stock.entities';
import { Index } from 'src/index/entities/index.entities';

@Injectable()
export class IndexstockService {
  constructor(
    @InjectRepository(Stock) private readonly StockRepo:Repository<Stock>,
    @InjectRepository(Index) private readonly IndexRepo:Repository<Index>,
    @InjectRepository(Indexstock) private readonly IndexStockRepo:Repository<Indexstock>
  ){}
  async CreateindexStock(createIndexstockDto: CreateIndexstockDto) {
    const {index_id,stock_id} = createIndexstockDto;
    try {
      // const valid =await this.Validate(index_id,stock_id)
      // //false => adds to db
      // //true => ignores from db
      // if(valid){
      //   throw new ConflictException(`Already present in db`)
      // }

      const indexRepo = await this.IndexRepo.findOneBy({index_id})
      const stockRepo = await this.StockRepo.findOneBy({stock_id})

      if(!(indexRepo||stockRepo))
      {
        throw new ConflictException("No id present ")
      }
      const indexstock = new Indexstock()
      indexstock.indexstock_id = uuidv4()
      indexstock.index = indexRepo
      indexstock.stock = stockRepo

      return this.IndexStockRepo.save(indexstock)
    } catch (error) {
      throw error
    }
    

  }

  async Validate(index_id: string, stock_id: string): Promise<boolean> {
    const indexDetails = await this.IndexRepo.findOneBy({index_id});
    const stockDetails = await this.StockRepo.findOneBy({stock_id});

    const indexStock = await this.IndexStockRepo.findOne({
      where: {
        index: { index_id: indexDetails.index_id },
        stock: { stock_id: stockDetails.stock_id }   
      }
    });

    if (!indexStock) { //not in db 
        return false
    }
    else{ // present in db 
      return true
    }

}

          async findIndex(index_id: string): Promise<any[] | null> {
            try {
              const stock = await this.IndexStockRepo
                .createQueryBuilder('indexstock')
                .innerJoinAndSelect('indexstock.stock', 'stock')
                .select([
                  'stock.*' // Select all columns from the `stock` table
                ]) // Join with the `stock` entity
                .where('indexstock.index_id = :index_id', { index_id }) // Filter by index_id
                .getRawMany(); // Fetch the raw data

              return stock;

            } catch (error) {
              console.error('Error fetching stock by index_id:', error);
              throw new Error('Could not fetch stock by index_id');
            }
          }


async findAll(){
  const indexstock = await this.IndexStockRepo.find()
  return indexstock
}
}
