import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MutualFund } from 'src/mutualfund/entities/mf.entities';
import { MutualfundModule } from 'src/mutualfund/mutualfund.module';
import { FundstockModule } from 'src/fundstock/fundstock.module';
import { Stock } from 'src/stock/entities/stock.entities';
import { FundStock } from 'src/fundstock/entities/fundstock.entities';
import { AMC } from 'src/amc/entities/amc.entities';
import { AmcModule } from 'src/amc/amc.module';
import { StockModule } from 'src/stock/stock.module';
import { Index } from 'src/index/entities/index.entities';
import { Indexstock } from 'src/indexstock/entities/indexstock.entity';
import { IndexModule } from 'src/index/index.module';
import { IndexstockModule } from 'src/indexstock/indexstock.module';


@Module({
    imports: [ TypeOrmModule.forFeature([MutualFund, Stock, FundStock, AMC, Index, Indexstock]), MutualfundModule, FundstockModule, AmcModule, StockModule, IndexModule, IndexstockModule],
    controllers: [FilesController],
    providers: [FilesService],
})
export class FilesModule {}
