import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MutualFund } from './entities/mf.entities';
import { MutualfundController } from './mutualfund.controller';
import { MutualfundService } from './mutualfund.service';
import { AMC } from 'src/amc/entities/amc.entities';
import { FundStock } from 'src/fundstock/entities/fundstock.entities';
import { Stock } from 'src/stock/entities/stock.entities';

@Module({
  imports: [TypeOrmModule.forFeature([MutualFund, AMC,FundStock,Stock])],
  controllers: [MutualfundController],
  providers: [MutualfundService],
  exports: [MutualfundService]
})
export class MutualfundModule {}
