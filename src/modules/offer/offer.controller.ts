import PageDto from 'src/shared/DTOs/page.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Param,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Query,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import PageOptionsDto from 'src/shared/DTOs/page-options.dto';
import Roles from 'src/shared/decorators/role.decorator';
import RolesGuard from 'src/shared/guards/roles.guard';
import OfferService from './offer.service';
import CreateOfferDto from './dto/create-offer.dto';
import OfferEntity from './entities/offer.entity';
import JWTGuard from '../auth/guards/jwt.guard';
import GetOfferParam from './dto/get-offer.param';
import SearchOffersQueryDto from './dto/search-offers.query';
import UpdateStatusDto from './dto/update-status.dto';
import { Role } from '../auth/types/user.interface';

@ApiTags('Offers')
@ApiBearerAuth()
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer $your.token',
})
@Controller('offer')
@UseGuards(JWTGuard, RolesGuard)
export default class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Post()
  @Roles(Role.FREELANCER)
  @UsePipes(new ValidationPipe())
  async create(@Body() createOfferDto: CreateOfferDto): Promise<OfferEntity> {
    try {
      const payload = await this.offerService.create(createOfferDto);
      return payload;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @Roles(Role.FREELANCER)
  @UsePipes(new ValidationPipe())
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<OfferEntity>> {
    try {
      const payload = await this.offerService.findAll(pageOptionsDto);
      return payload;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('getById/:id')
  @Roles(Role.FREELANCER)
  @UsePipes(new ValidationPipe())
  async findOne(@Param() params: GetOfferParam): Promise<OfferEntity> {
    try {
      const payload = await this.offerService.findOfferById(params.id);
      return payload;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('filter')
  @Roles(Role.FREELANCER)
  async findFilteredAll(
    @Query() searchByUserDto: SearchOffersQueryDto,
  ): Promise<PageDto<OfferEntity>> {
    try {
      const response = this.offerService.findFilteredAll(searchByUserDto);
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('ChangeStatus')
  @Roles(Role.FREELANCER)
  @UsePipes(new ValidationPipe())
  async update(@Body() updateStatusDto: UpdateStatusDto): Promise<OfferEntity> {
    const offer = await this.offerService.updateStatus(updateStatusDto);
    return offer;
  }

  @Get('getByJobId')
  @Roles(Role.FREELANCER)
  @UsePipes(new ValidationPipe())
  async getByJobId(@Query('jobId') jobId: number): Promise<OfferEntity> {
    try {
      const offer = await this.offerService.findByJobId(jobId);

      return offer;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
