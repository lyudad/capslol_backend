import { PartialType } from '@nestjs/swagger';
import { CreateSkillProfileDto } from './create-skill-profile.dto';

export class UpdateSkillProfileDto extends PartialType(CreateSkillProfileDto) {}
