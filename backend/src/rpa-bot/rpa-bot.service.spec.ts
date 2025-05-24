import { Test, TestingModule } from '@nestjs/testing';
import { RpaBotService } from './rpa-bot.service';

describe('RpaBotService', () => {
  let service: RpaBotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RpaBotService],
    }).compile();

    service = module.get<RpaBotService>(RpaBotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
