import { Module } from '@nestjs/common';
import { PublicProfileService } from './public-profile.service';
import { PublicProfileController } from './public-profile.controller';

@Module({
  controllers: [PublicProfileController],
  providers: [PublicProfileService]
})
export class PublicProfileModule {}
