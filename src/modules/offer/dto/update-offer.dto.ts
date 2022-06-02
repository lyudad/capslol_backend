import { PartialType } from '@nestjs/swagger';
import CreateOfferDto from './create-offer.dto';

export default class UpdateOfferDto extends PartialType(CreateOfferDto) {}
