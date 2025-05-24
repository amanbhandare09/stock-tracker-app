import { Test, TestingModule } from '@nestjs/testing';
import { DatasciController } from './datasci.controller';
import { DatasciService } from './datasci.service';

describe('DatasciController', () => {
  let controller: DatasciController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatasciController],
      providers: [DatasciService],
    }).compile();

    controller = module.get<DatasciController>(DatasciController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
