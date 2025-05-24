import { Module } from '@nestjs/common';
import { AmcService } from './amc.service';
import { AmcController } from './amc.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AMC } from './entities/amc.entities';
import { MutualFund } from 'src/mutualfund/entities/mf.entities';

@Module({
  imports: [TypeOrmModule.forFeature([AMC , MutualFund])],
  controllers: [AmcController],
  providers: [AmcService],
  exports: [AmcService]
})
export class AmcModule {}
