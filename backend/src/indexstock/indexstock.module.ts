import { Module } from '@nestjs/common';
import { IndexstockService } from './indexstock.service';
import { IndexstockController } from './indexstock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Indexstock } from './entities/indexstock.entity';
import { Index } from 'src/index/entities/index.entities';
import { Stock } from 'src/stock/entities/stock.entities';

@Module({
  imports:[TypeOrmModule.forFeature([Indexstock,Index,Stock])],
  controllers: [IndexstockController],
  providers: [IndexstockService],
  exports: [IndexstockService]
})
export class IndexstockModule {}
