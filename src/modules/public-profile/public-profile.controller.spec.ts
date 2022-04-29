import { Test, TestingModule } from '@nestjs/testing';
import { PublicProfileController } from './public-profile.controller';
import { PublicProfileService } from './public-profile.service';

describe('PublicProfileController', () => {
  let controller: PublicProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicProfileController],
      providers: [PublicProfileService],
    }).compile();

    controller = module.get<PublicProfileController>(PublicProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
