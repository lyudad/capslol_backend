import { PartialType } from '@nestjs/swagger';
import { CreatePublicProfileDto } from './create-public-profile.dto';

export class UpdatePublicProfileDto extends PartialType(CreatePublicProfileDto) {}
