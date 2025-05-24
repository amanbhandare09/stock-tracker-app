import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RpaBotService } from './rpa-bot.service';
import { RpaBotController } from './rpa-bot.controller';
import { RpaBot } from './entities/rpa-bot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RpaBot])],
  controllers: [RpaBotController],
  providers: [RpaBotService],
})
export class RpaBotModule {}
