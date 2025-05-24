import { Controller, Post, Body, HttpException, Param, Get } from '@nestjs/common';
import { IndexstockService } from './indexstock.service';
import { CreateIndexstockDto } from './dto/create-indexstock.dto';

@Controller('indexstock')
export class IndexstockController {
  constructor(private readonly indexstockService: IndexstockService) {}

  @Post()
  CreateindexStock(@Body() createIndexstockDto: CreateIndexstockDto) {
    try {
      return this.indexstockService.CreateindexStock(createIndexstockDto);
    } catch (error) {
      throw new HttpException(error.response || 'Internal Server Error', error.status || 500);
    }
  }

  @Get(':id')
  async FindStockbyId(@Param('id') id: string): Promise<any> {
    try {
      if (!id) {
        return { "message": "No id entered" };
      }
  
      // Call the service method to find the stock by ID
      const result = await this.indexstockService.findIndex(id);  // Assuming you have a service method to fetch the stock by ID
      const count = result.length
      console.log(count)
       
      if (!result) {
        return { "message": "Stock not found" };
      }
  
      return result;
    } catch (error) {
      console.error(error);
      return { "message": "An error occurred", "error": error.message };
    }
  }


  @Get()
  AllIndex(){
    try {
      const result = this.indexstockService.findAll()
      return result
    } catch (error) {
      
    }
  }

  

  
}
