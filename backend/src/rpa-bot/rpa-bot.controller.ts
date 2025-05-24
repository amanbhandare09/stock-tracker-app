import { Controller, Post, Get } from '@nestjs/common';
import { RpaBotService } from './rpa-bot.service';
import { RpaBot } from './entities/rpa-bot.entity';

@Controller('rpa-bot')
export class RpaBotController {
  constructor(private readonly rpaBotService: RpaBotService) {}

  @Post('portfolio')
  async portfolioBot() {
    try {
      const result = await this.rpaBotService.runPortfolioBot();
      return { success: true, output: result };
    } catch (error) {
      return { success: false, message: error };
    }
  }

  @Post('stop-portfolio')
  stopPortfolioBot() {
    const result = this.rpaBotService.stopPortfolioBot();
    return { success: true, message: result };
  }

  @Post('stockscraper')
  async nseBot() {
    try {
      const result = await this.rpaBotService.runNseBot();
      return { success: true, output: result };
    } catch (error) {
      return { success: false, message: error };
    }
  }

  @Post('stop-stockscraper')
  stopNseBot() {
    const result = this.rpaBotService.stopNseBot();
    return { success: true, message: result };
  }

  @Post('fortnightly')
  async fortnightlyBot() {
    try {
      const result = await this.rpaBotService.runFortnightlyBot();
      return { success: true, output: result };
    } catch (error) {
      return { success: false, message: error };
    }
  }

  @Post('stop-fortnightly')
  stopFortnightlyBot() {
    const result = this.rpaBotService.stopFortnightlyBot();
    return { success: true, message: result };
  }

  @Get('history')
  async findAllBotStatuses(): Promise<RpaBot[]> {
    return this.rpaBotService.findAllBotStatuses();
  }
}
