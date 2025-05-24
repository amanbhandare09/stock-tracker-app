import { Module } from '@nestjs/common';
import { OverlapService } from './overlap.service';
import { OverlapController } from './overlap.controller';
import { Stock } from 'src/stock/entities/stock.entities';
import { FundStock } from 'src/fundstock/entities/fundstock.entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MutualFund } from 'src/mutualfund/entities/mf.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Stock,FundStock, MutualFund])],
  controllers: [OverlapController],
  providers: [OverlapService],
})
export class OverlapModule {}
