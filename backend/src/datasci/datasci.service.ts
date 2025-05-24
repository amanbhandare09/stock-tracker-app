import { Injectable } from '@nestjs/common';
import { exec, ChildProcess } from 'child_process';
import * as path from 'path';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RpaBot } from '../rpa-bot/entities/rpa-bot.entity';

@Injectable()
export class DatasciService {
  private botProcess: ChildProcess | null = null;
  private indicesProcess: ChildProcess | null = null;

  constructor(
    @InjectRepository(RpaBot)
    private rpaBotRepository: Repository<RpaBot>,
  ) {}

  async dsBot(): Promise<RpaBot> {
    const bot = new RpaBot();
    bot.bot_name = 'DS bot';
    bot.start_time = new Date();
    return this.rpaBotRepository.save(bot);
  }

  async runDsBot(): Promise<string> {
    const botRecord = await this.dsBot();

    return new Promise((resolve, reject) => {
      const scriptPath = path.join(
        __dirname,
        '..',
        '..',
        '..',
        'CC-DataScience',
        'monthly.py'
      );

      this.botProcess = exec(`python ${scriptPath}`, async (error, stdout, stderr) => {
        if (error) {
          reject(`Error: ${error.message}`);
        } else if (stderr) {
          reject(`Stderr: ${stderr}`);
        } else {
          const endTime = new Date();
          const executionTimeMs = endTime.getTime() - botRecord.start_time.getTime();

          const executionTime = new Date(executionTimeMs).toISOString().substr(11, 8);
          botRecord.execution_time = executionTime;
          botRecord.status = 'Completed';
          await this.rpaBotRepository.save(botRecord);

          resolve(stdout);
        }
        this.botProcess = null;
      });
    });
  }

  stopDsBot(): string {
    if (this.botProcess) {
      this.botProcess.kill('SIGTERM');
      this.botProcess = null;
      return 'DS bot execution stopped';
    } else {
      return 'No DS bot is currently running';
    }
  }

  async indicesBot(): Promise<RpaBot> {
    const bot = new RpaBot();
    bot.bot_name = 'Indices bot';
    bot.start_time = new Date();
    return this.rpaBotRepository.save(bot);
  }

  async runIndicesBot(): Promise<string> {
    const botRecord = await this.indicesBot();

    return new Promise((resolve, reject) => {
      const scriptPath = path.join(
        __dirname,
        '..',
        '..',
        '..',
        'CC-DataScience',
        'indices.py'
      );

      this.indicesProcess = exec(`python ${scriptPath}`, async (error, stdout, stderr) => {
        if (error) {
          reject(`Error: ${error.message}`);
        } else if (stderr) {
          reject(`Stderr: ${stderr}`);
        } else {
          const endTime = new Date();
          const executionTimeMs = endTime.getTime() - botRecord.start_time.getTime();

          const executionTime = new Date(executionTimeMs).toISOString().substr(11, 8);
          botRecord.execution_time = executionTime;
          botRecord.status = 'Completed';
          await this.rpaBotRepository.save(botRecord);

          resolve(stdout);
        }
        this.indicesProcess = null;
      });
    });
  }

  stopIndicesBot(): string {
    if (this.indicesProcess) {
      this.indicesProcess.kill('SIGTERM');
      this.indicesProcess = null;
      return 'Indices bot execution stopped';
    } else {
      return 'No Indices bot is currently running';
    }
  }

  async findAllBotStatuses(): Promise<RpaBot[]> {
    return this.rpaBotRepository.find();
  }

  async FortBot(): Promise<RpaBot> {
    const bot = new RpaBot();
    bot.bot_name = 'DS bot';
    bot.start_time = new Date();
    return this.rpaBotRepository.save(bot);
  }

  async runFortBot(): Promise<string> {
    const botRecord = await this.dsBot();

    return new Promise((resolve, reject) => {
      const scriptPath = path.join(
        __dirname,
        '..',
        '..',
        '..',
        'CC-DataScience',
        'fortnightly.py'
      );

      this.botProcess = exec(`python ${scriptPath}`, async (error, stdout, stderr) => {
        if (error) {
          reject(`Error: ${error.message}`);
        } else if (stderr) {
          reject(`Stderr: ${stderr}`);
        } else {
          const endTime = new Date();
          const executionTimeMs = endTime.getTime() - botRecord.start_time.getTime();

          const executionTime = new Date(executionTimeMs).toISOString().substr(11, 8);
          botRecord.execution_time = executionTime;
          botRecord.status = 'Completed';
          await this.rpaBotRepository.save(botRecord);

          resolve(stdout);
        }
        this.botProcess = null;
      });
    });
  }

  stopFortBot(): string {
    if (this.botProcess) {
      this.botProcess.kill('SIGTERM');
      this.botProcess = null;
      return 'DS bot execution stopped';
    } else {
      return 'No DS bot is currently running';
    }
  }

}
