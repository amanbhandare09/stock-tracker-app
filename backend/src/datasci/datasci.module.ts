import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatasciService } from './datasci.service';
import { DataSciController } from './datasci.controller';
import { RpaBot } from '../rpa-bot/entities/rpa-bot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RpaBot])],
  controllers: [DataSciController],
  providers: [DatasciService],
})
export class DatasciModule {}
