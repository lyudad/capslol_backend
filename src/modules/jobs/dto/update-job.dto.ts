import { PartialType } from '@nestjs/swagger';
import CreateJobDto from './create-job.dto';

export default class UpdateJobDto extends PartialType(CreateJobDto) {}
