import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PublicProfileService from './public-profile.service';
import PublicProfileController from './public-profile.controller';
import PublicProfile from './entities/public-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PublicProfile])],
  controllers: [PublicProfileController],
  providers: [PublicProfileService],
})
export default class PublicProfileModule {}
