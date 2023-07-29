import { Test, TestingModule } from '@nestjs/testing';
import { ExpeditorsController } from './expeditors.controller';
import { ExpeditorsService } from './expeditors.service';

describe('ExpeditorsController', () => {
  let controller: ExpeditorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpeditorsController],
      providers: [ExpeditorsService],
    }).compile();

    controller = module.get<ExpeditorsController>(ExpeditorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
