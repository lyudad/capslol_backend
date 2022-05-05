import { Module } from '@nestjs/common';
import { SkillProfileService } from './skill-profile.service';
import { SkillProfileController } from './skill-profile.controller';

@Module({
  controllers: [SkillProfileController],
  providers: [SkillProfileService]
})
export class SkillProfileModule {}
