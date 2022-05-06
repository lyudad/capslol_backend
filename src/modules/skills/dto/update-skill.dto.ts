import { PartialType } from '@nestjs/swagger';
import CreateSkillDto from './create-skill.dto';

export default class UpdateSkillDto extends PartialType(CreateSkillDto) {}
