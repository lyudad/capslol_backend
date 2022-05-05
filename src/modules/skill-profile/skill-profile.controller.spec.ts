import { Test, TestingModule } from '@nestjs/testing';
import { SkillProfileController } from './skill-profile.controller';
import { SkillProfileService } from './skill-profile.service';

describe('SkillProfileController', () => {
  let controller: SkillProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkillProfileController],
      providers: [SkillProfileService],
    }).compile();

    controller = module.get<SkillProfileController>(SkillProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
