import { Test, TestingModule } from '@nestjs/testing';
import { ExpeditorsService } from './expeditors.service';

describe('ExpeditorsService', () => {
  let service: ExpeditorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpeditorsService],
    }).compile();

    service = module.get<ExpeditorsService>(ExpeditorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
