import { Test, TestingModule } from '@nestjs/testing';
import { SubAgencyController } from './sub-agency.controller';
import { SubAgencyService } from './sub-agency.service';

describe('SubAgencyController', () => {
  let controller: SubAgencyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubAgencyController],
      providers: [SubAgencyService],
    }).compile();

    controller = module.get<SubAgencyController>(SubAgencyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
