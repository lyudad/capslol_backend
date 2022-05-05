import { Test, TestingModule } from '@nestjs/testing';
import { SkillProfileService } from './skill-profile.service';

describe('SkillProfileService', () => {
  let service: SkillProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkillProfileService],
    }).compile();

    service = module.get<SkillProfileService>(SkillProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
