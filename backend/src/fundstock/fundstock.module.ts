import { Module } from '@nestjs/common';
import { FundstockService } from './fundstock.service';
import { FundstockController } from './fundstock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FundStock } from './entities/fundstock.entities';
import { Stock } from 'src/stock/entities/stock.entities';
import { MutualFund } from 'src/mutualfund/entities/mf.entities';

@Module({
  imports: [TypeOrmModule.forFeature([FundStock, Stock, MutualFund])],
  controllers: [FundstockController],
  providers: [FundstockService],
  exports: [FundstockService],
})
export class FundstockModule {}
