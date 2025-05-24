import { Test, TestingModule } from '@nestjs/testing';
import { DatasciService } from './datasci.service';

describe('DatasciService', () => {
  let service: DatasciService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatasciService],
    }).compile();

    service = module.get<DatasciService>(DatasciService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
