import { Body, Controller, Delete, Get, HttpException, Param, Post, Put } from '@nestjs/common';
import { MutualfundService } from './mutualfund.service';

import { CreateMutualFundDto } from './dto/createmf.dto';

@Controller('mf')
export class MutualfundController {

    constructor(private readonly mutualfundService: MutualfundService){}

    @Get()
    getMutualfunds() {
        return this.mutualfundService.findAll();
    }

    @Get(':id')
    
    getMutualfundById(@Param('id') id: string) {
        return this.mutualfundService.findbyID(id);
    }

    @Post()
    createMutualfund(@Body() body:CreateMutualFundDto) {
        try{
            return this.mutualfundService.createMutualFund(body);
        }catch(error){
            throw new HttpException(error.response || 'Internal Server Error', error.status || 500);
        }
    }

    @Delete(':id')
    deleteMutualfund(@Param('id') id: string) {
        return this.mutualfundService.Delete(id);
    }

    @Get(':id/stocks')
    getMutualfundStocks(@Param('id') id: string) {
        return this.mutualfundService.getMutualFundStocks(id);
    }

    @Put('total')
    updateTotalAssets(){
        return this.mutualfundService.updateAllTotalAssets();
    }
}
