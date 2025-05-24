import { Module } from '@nestjs/common';
import { IndexService } from './index.service';
import { IndexController } from './index.controller';
import { Index } from './entities/index.entities'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Index])],
  controllers: [IndexController],
  providers: [IndexService],
  exports: [IndexService]
})
export class IndexModule {}
