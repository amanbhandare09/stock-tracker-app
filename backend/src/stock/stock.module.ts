import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entities';
import { MutualFund } from 'src/mutualfund/entities/mf.entities';
import { FundStock } from 'src/fundstock/entities/fundstock.entities';
import { FundstockModule } from 'src/fundstock/fundstock.module';
import { MutualfundModule } from 'src/mutualfund/mutualfund.module';

@Module({

  imports: [TypeOrmModule.forFeature([Stock,MutualFund,FundStock]),
  FundstockModule,
  MutualfundModule,
],
  controllers: [StockController],
  providers: [StockService],
  exports: [StockService]
})
export class StockModule {}
