import { PartialType } from '@nestjs/swagger';
import CreateEducationDto from './create-education.dto';

export default class UpdateEducationDto extends PartialType(
  CreateEducationDto,
) {}
