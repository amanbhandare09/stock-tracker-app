import { Test, TestingModule } from '@nestjs/testing';
import { RpaBotController } from './rpa-bot.controller';
import { RpaBotService } from './rpa-bot.service';

describe('RpaBotController', () => {
  let controller: RpaBotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RpaBotController],
      providers: [RpaBotService],
    }).compile();

    controller = module.get<RpaBotController>(RpaBotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
