import { Controller, Post, Delete, Body, Param, HttpException } from '@nestjs/common';
import { FundstockService } from './fundstock.service';
import { CreateFundStockDto } from './dto/createfs.dto';
// import { UpdateFundStockDto } from './dto/updatefs.dto';

@Controller('fundstock')
export class FundstockController {
  constructor(private readonly fundstockService: FundstockService) {}

  @Post()
  createFundStock(@Body() createFundStockDto: CreateFundStockDto) {
    try{
      return this.fundstockService.createFundStock(createFundStockDto);
    }catch(error){
      throw new HttpException(error.response || 'Internal Server Error', error.status || 500);
    }
  }
  @Delete(':id')
  deleteFundStock(@Param('id') id:string) {
    return this.fundstockService.removeFundStock(id);
  }
}
