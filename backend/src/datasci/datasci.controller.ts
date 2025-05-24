import { Controller, Post, Get } from '@nestjs/common';
import { DatasciService } from './datasci.service';
import { RpaBot } from '../rpa-bot/entities/rpa-bot.entity';

@Controller('datasci')
export class DataSciController {
  constructor(private readonly dataSciService: DatasciService) {}

  @Post('run')
  async runDsBot() {
    try {
      const result = await this.dataSciService.runDsBot();
      return { success: true, output: result };
    } catch (error) {
      return { success: false, message: error };
    }
  }

  @Post('stop')
  stopDsBot() {
    const result = this.dataSciService.stopDsBot();
    return { success: true, message: result };
  }

  @Post('run-indices')
  async runIndicesBot() {
    try {
      const result = await this.dataSciService.runIndicesBot();
      return { success: true, output: result };
    } catch (error) {
      return { success: false, message: error };
    }
  }

  @Post('stop-indices')
  stopIndicesBot() {
    const result = this.dataSciService.stopIndicesBot();
    return { success: true, message: result };
  }

  @Post('fortnightly')
  async runFortBot() {
    try {
      const result = await this.dataSciService.runDsBot();
      return { success: true, output: result };
    } catch (error) {
      return { success: false, message: error };
    }
  }

  @Post('stop-fort')
  stopFortBot() {
    const result = this.dataSciService.stopDsBot();
    return { success: true, message: result };
  }

  @Get('statuses')
  async findAllBotStatuses(): Promise<RpaBot[]> {
    return this.dataSciService.findAllBotStatuses();
  }
}