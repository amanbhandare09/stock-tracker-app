import { Injectable } from '@nestjs/common';
import { spawn, ChildProcess } from 'child_process';
import * as path from 'path';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RpaBot } from './entities/rpa-bot.entity';

@Injectable()
export class RpaBotService {
  private portfolioBotProcess: ChildProcess | null = null;
  private nseBotProcess: ChildProcess | null = null;
  private fortnightlyBotProcess: ChildProcess | null = null;

  constructor(
    @InjectRepository(RpaBot)
    private rpaBotRepository: Repository<RpaBot>,
  ) {}

  async portfolioBot(): Promise<RpaBot> {
    const bot = new RpaBot();
    bot.bot_name = 'portfolio bot';
    bot.start_time = new Date();
    return this.rpaBotRepository.save(bot);
  }

  async runPortfolioBot(): Promise<string> {
    const botRecord = await this.portfolioBot();

    return new Promise((resolve, reject) => {
      const scriptPath = path.join(
        __dirname,
        '..',
        '..',
        '..',
        'rpa_bots',
        'portfolio_disclosure_downloading_bot',
        'main_script.py'
      );

      this.portfolioBotProcess = spawn('python', [scriptPath]);

      let output = '';
      this.portfolioBotProcess.stdout.on('data', (data) => {
        output += data.toString();
      });

      this.portfolioBotProcess.stderr.on('data', (data) => {
        reject(`Stderr: ${data.toString()}`);
      });

      this.portfolioBotProcess.on('close', async (code) => {
        const endTime = new Date();
        const executionTimeMs = endTime.getTime() - botRecord.start_time.getTime();
        botRecord.execution_time = new Date(executionTimeMs).toISOString().substr(11, 8);
        botRecord.status = code === 0 ? 'Completed' : 'Error';
        await this.rpaBotRepository.save(botRecord);
        this.portfolioBotProcess = null;
        resolve(output);
      });
    });
  }

  stopPortfolioBot(): string {
    if (this.portfolioBotProcess) {
      try {
        process.kill(this.portfolioBotProcess.pid, 'SIGTERM'); // Explicitly kill the process
        this.portfolioBotProcess = null;
        return 'Portfolio bot execution stopped';
      } catch (error) {
        return `Failed to stop portfolio bot: ${error.message}`;
      }
    } else {
      return 'No portfolio bot is currently running';
    }
  }

  async nseBot(): Promise<RpaBot> {
    const bot = new RpaBot();
    bot.bot_name = 'nse stock scraper bot';
    bot.start_time = new Date();
    return this.rpaBotRepository.save(bot);
  }

  async runNseBot(): Promise<string> {
    const botRecord = await this.nseBot();

    return new Promise((resolve, reject) => {
      const scriptPath = path.join(
        __dirname,
        '..',
        '..',
        '..',
        'rpa_bots',
        'nse_stock_scraper_bot',
        'main.py'
      );

      this.nseBotProcess = spawn('python', [scriptPath]);

      let output = '';
      this.nseBotProcess.stdout.on('data', (data) => {
        output += data.toString();
      });

      this.nseBotProcess.stderr.on('data', (data) => {
        reject(`Stderr: ${data.toString()}`);
      });

      this.nseBotProcess.on('close', async (code) => {
        const endTime = new Date();
        const executionTimeMs = endTime.getTime() - botRecord.start_time.getTime();
        botRecord.execution_time = new Date(executionTimeMs).toISOString().substr(11, 8);
        botRecord.status = code === 0 ? 'Completed' : 'Error';
        await this.rpaBotRepository.save(botRecord);
        this.nseBotProcess = null;
        resolve(output);
      });
    });
  }

  stopNseBot(): string {
    if (this.nseBotProcess) {
      try {
        process.kill(this.nseBotProcess.pid, 'SIGTERM'); // Explicitly kill the process
        this.nseBotProcess = null;
        return 'NSE bot execution stopped';
      } catch (error) {
        return `Failed to stop NSE bot: ${error.message}`;
      }
    } else {
      return 'No NSE bot is currently running';
    }
  }

  async fortnightlyBot(): Promise<RpaBot> {
    const bot = new RpaBot();
    bot.bot_name = 'fortnightly disclosure downloading';
    bot.start_time = new Date();
    return this.rpaBotRepository.save(bot);
  }

  async runFortnightlyBot(): Promise<string> {
    const botRecord = await this.fortnightlyBot();

    return new Promise((resolve, reject) => {
      const scriptPath = path.join(
        __dirname,
        '..',
        '..',
        '..',
        'rpa_bots',
        'fortnightly_disclosure_downloading_bot',
        'main_script.py'
      );

      this.fortnightlyBotProcess = spawn('python', [scriptPath]);

      let output = '';
      this.fortnightlyBotProcess.stdout.on('data', (data) => {
        output += data.toString();
      });

      this.fortnightlyBotProcess.stderr.on('data', (data) => {
        reject(`Stderr: ${data.toString()}`);
      });

      this.fortnightlyBotProcess.on('close', async (code) => {
        const endTime = new Date();
        const executionTimeMs = endTime.getTime() - botRecord.start_time.getTime();
        botRecord.execution_time = new Date(executionTimeMs).toISOString().substr(11, 8);
        botRecord.status = code === 0 ? 'Completed' : 'Error';
        await this.rpaBotRepository.save(botRecord);
        this.fortnightlyBotProcess = null;
        resolve(output);
      });
    });
  }

  stopFortnightlyBot(): string {
    if (this.fortnightlyBotProcess) {
      try {
        process.kill(this.fortnightlyBotProcess.pid, 'SIGTERM'); // Explicitly kill the process
        this.fortnightlyBotProcess = null;
        return 'Fortnightly bot execution stopped';
      } catch (error) {
        return `Failed to stop fortnightly bot: ${error.message}`;
      }
    } else {
      return 'No fortnightly bot is currently running';
    }
  }

  async findAllBotStatuses(): Promise<RpaBot[]> {
    return this.rpaBotRepository.find();
  }
}
