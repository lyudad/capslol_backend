import { PartialType } from '@nestjs/swagger';
import CreateContractDto from './create-contract.dto';

export default class UpdateContractDto extends PartialType(CreateContractDto) {}
