import { PartialType } from '@nestjs/swagger';
import CreateExperienceDto from './create-experience.dto';

export default class UpdateExperienceDto extends PartialType(
  CreateExperienceDto,
) {}
