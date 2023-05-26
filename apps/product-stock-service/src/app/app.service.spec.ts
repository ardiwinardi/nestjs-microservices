import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../../../auth-service/src/app/app.service';

describe('ProductStocksService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
