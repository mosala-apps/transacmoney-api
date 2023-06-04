import { Test, TestingModule } from '@nestjs/testing';
import { SubAgencyService } from './sub-agency.service';

describe('SubAgencyService', () => {
  let service: SubAgencyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubAgencyService],
    }).compile();

    service = module.get<SubAgencyService>(SubAgencyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
