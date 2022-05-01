import { PartialType } from '@nestjs/swagger';
import CreatePublicProfileDto from './create-public-profile.dto';

export default class UpdatePublicProfileDto extends PartialType(
  CreatePublicProfileDto,
) {}
