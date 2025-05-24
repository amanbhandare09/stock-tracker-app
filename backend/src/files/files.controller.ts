import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { FilesService } from './files.service';

@Controller('data')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Post('/amc')
  async addAMC(): Promise<any> {
    try {
      return this.filesService.addAMCtoDb();
    } catch (error) {
      throw new HttpException(error.response || 'Internal Server Error', error.status || 500);
    }
  }
  @Post('/stock')
  async addStock(): Promise<any> {
    try {
      return this.filesService.addStocktoDb();
    } catch (error) {
      throw new HttpException(error.response || 'Internal Server Error', error.status || 500);
    }
  }
  @Post('/mf')
  async addMf(): Promise<any> {
    try {
      return this.filesService.addFundtoDb();
    } catch (error) {
      throw new HttpException(error.response || 'Internal Server Error', error.status || 500);
    }
  }
  @Post('/fs')
  async addFs(): Promise<any> {
    try {
      return this.filesService.addFundStocktoDb();
    } catch (error) {
      throw new HttpException(error.response || 'Internal Server Error', error.status || 500);
    }
  }

  @Post('/fort')
  async addfort(): Promise<any> {
    try {
      return this.filesService.addFortnightlyData();
    } catch (error) {
      throw new HttpException(error.response || 'Internal Server Error', error.status || 500);
    }
  }

  @Get('/deactivatefs')
  async deactivateFs(): Promise<any> {
    try {
      return this.filesService.deactivateFundStockData();
    } catch (error) {
      throw new HttpException(error.response || 'Internal Server Error', error.status || 500);
    }
  }

  @Get('/deactivatefund')
  async deactivateFund(@Body('name') name: string): Promise<any> {
    try {
      return this.filesService.deactivateFundData(name);
    } catch (error) {
      throw new HttpException(error.response || 'Internal Server Error', error.status || 500);
    }
  }

  @Post('/updatestockdata')
  async updateStock(): Promise<any> {
    try {
      return this.filesService.updateStockData();
    } catch (error) {
      throw new HttpException(error.response || 'Internal Server Error', error.status || 500);
    }
  }

  @Post('/addindex')
  async addindex(): Promise<any> {
    try {
      return this.filesService.addIndexData();
    } catch (error) {
      throw new HttpException(error.response || 'Internal Server Error', error.status || 500);
    }
  }

  @Post('/addindexstock')
  async addindexstock(): Promise<any> {
    try {
      return this.filesService.addIndexStockData();
    } catch (error) {
      throw new HttpException(error.response || 'Internal Server Error', error.status || 500);
    }
  }
}