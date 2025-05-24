import { Controller, Delete, Get, Param, Post, Body, HttpException, HttpStatus} from '@nestjs/common';
import { StockService } from './stock.service';
import { Stock } from './entities/stock.entities';
import { CreateStockDto } from './dto/createstock.dto';
import { MutualFund } from 'src/mutualfund/entities/mf.entities';

@Controller('stock')
export class StockController {

    constructor(private readonly stockService: StockService) {}

    @Get()
    async findAll(): Promise<Stock[]> {
      try{
      return this.stockService.findAll();
          } 
          catch(error){
            throw new HttpException(error.message,HttpStatus.INTERNAL_SERVER_ERROR);
          }
    }

    @Get(':id')
    
    async getStockById(@Param('id') id:string):Promise<Stock> {
      try{
        return this.stockService.findById(id);
      }
      catch(error){
        throw new HttpException(error.message,HttpStatus.NOT_FOUND);
      }
    }

    @Post()
    async create(@Body() createStockDto: CreateStockDto): Promise<Stock> {
      try {
        return this.stockService.create(createStockDto);
      } catch (error) {
        // Pass the error to NestJS exception handling
        throw new HttpException(error.response || 'Internal Server Error', error.status || 500);
      }
    }
  
    @Delete(':id')
    async delete(@Param('id') stock_id: string): Promise<void> {
      try{
      return this.stockService.delete(stock_id);
    }catch(error){
      throw  new HttpException(error.message,HttpStatus.NOT_FOUND);
    }
    }

    @Get(':id/mf')
    async getMutualFundsByStockId(
      @Param('id') stockId: string
    ): Promise<MutualFund[]> {
      try{
      return this.stockService.findMutualFundsByStockId(stockId);
    }catch(error){
      throw new HttpException(error.Message,HttpStatus.INTERNAL_SERVER_ERROR);
    }
    }
}
