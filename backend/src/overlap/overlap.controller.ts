import { BadRequestException, Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';
import { OverlapService } from './overlap.service';
import { searchFund } from './dto/search.dto';
import { validate as uuidValidate } from 'uuid';


@Controller('overlap')
export class OverlapController {
  constructor(private readonly overlapService: OverlapService) {}
  
  @Get(':id1/:id2')
  async findStocks(
    @Param('id1') fund_id1: string,
    @Param('id2') fund_id2: string
  ): Promise<any> {
    try{

    if(!(uuidValidate(fund_id1) || uuidValidate(fund_id2))){
      throw new Error("Invalid id provided for mutual fund");
    }  
    const allstocks = await this.overlapService.findStocks(fund_id1, fund_id2);
    const commonstocks = await this.overlapService.commonStocks(fund_id1, fund_id2);
    const stocksA_id = allstocks[0].map(stock => stock.s_stock_id);
    const stocksB_id = allstocks[1].map(stock => stock.s_stock_id);
    const flattenedAllstocks = allstocks.flat();
    const uncommon_stocks = flattenedAllstocks.filter(stock => 
      !commonstocks.some(common => common.s_stock_id === stock.s_stock_id)
    );
    const uncommon_stocks_A = uncommon_stocks.filter(stock => stocksA_id.includes(stock.s_stock_id));
    const uncommon_stocks_B = uncommon_stocks.filter(stock => stocksB_id.includes(stock.s_stock_id));
    //data return 
    const data =  await this.overlapService.dataStocks(commonstocks,uncommon_stocks_A,uncommon_stocks_B);
    const calculation = this.overlapService.calculation(allstocks,commonstocks)
   


    return {
      data:data,
      message5:"calculation",
      calculation:calculation
    };
  }catch(error){
    console.log(error)
    return "No Mutual Fund found";
  }
  }
@Get('common/:id1/:id2')
  async commonStocks(
    @Param('id1') fund_id1: string,
    @Param('id2') fund_id2: string
  ): Promise<any> {
    const commonstocks = await this.overlapService.commonStocks(fund_id1, fund_id2);
    return {
      message:"rhese are common stocks",
      data:commonstocks};
  }

  @Get('searchmf')
  async searchmf(@Query('mf') mf:string):Promise<searchFund[] | string>{
    try{
      const payload = await this.overlapService.searchmf(mf);
      if(!payload || (Array.isArray(payload) && payload.length === 0)){
        throw new Error;
      }
      return payload;
    }catch(err){

      return "No Mutual Fund found";
    }
    ;
  }

  @Get('search')
  async searchStockByName(@Query('ss') ss: string): Promise<searchFund[]> {
    if (!ss) {
      throw new BadRequestException('Search string is required');
    }
    try {
      const searchResults = await this.overlapService.SearchStockByName(ss);
      if (searchResults.length === 0) {
        throw new NotFoundException('No stock found');
      }
      return searchResults;
    } catch (err) {
      console.error('Error in searchStockByName:', err);
      throw new NotFoundException('No stock found');
    }
  }
}
