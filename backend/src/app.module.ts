import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AmcModule } from './amc/amc.module';
import { StockModule } from './stock/stock.module';
import { MutualfundModule } from './mutualfund/mutualfund.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FundstockModule } from './fundstock/fundstock.module';
import { OverlapModule } from './overlap/overlap.module';
import { typeOrmConfig } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { RpaBotModule } from './rpa-bot/rpa-bot.module';
import { FilesModule } from './files/files.module';
import { DatasciModule } from './datasci/datasci.module';

import { IndexModule } from './index/index.module';
import { IndexstockModule } from './indexstock/indexstock.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AmcModule,
    StockModule,
    FilesModule,
    MutualfundModule,
    FundstockModule,
    OverlapModule,
    AuthModule,
    RpaBotModule, DatasciModule, IndexModule, IndexstockModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
