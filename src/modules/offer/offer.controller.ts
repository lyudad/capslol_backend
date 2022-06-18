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
import OfferService from './offer.service';
import CreateOfferDto from './dto/create-offer.dto';
import OfferEntity from './entities/offer.entity';
import JWTGuard from '../auth/guards/jwt.guard';
import GetOfferParam from './dto/get-offer.param';
import SearchOffersQuery from './dto/search-offers.query';
import UpdateStatusDto from './dto/update-status.dto';

@ApiTags('Offers')
@ApiBearerAuth()
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer $your.token',
})
@Controller('offer')
export default class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(JWTGuard)
  async create(@Body() createOfferDto: CreateOfferDto): Promise<OfferEntity> {
    try {
      const payload = await this.offerService.create(createOfferDto);
      return payload;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @UsePipes(new ValidationPipe())
  @UseGuards(JWTGuard)
  async findAll(): Promise<OfferEntity[]> {
    try {
      const payload = await this.offerService.findAll();
      return payload;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('getById/:id')
  @UsePipes(new ValidationPipe())
  @UseGuards(JWTGuard)
  async findOne(@Param() params: GetOfferParam): Promise<OfferEntity> {
    try {
      const payload = await this.offerService.findOfferById(params.id);
      return payload;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('getOffers')
  @UsePipes(new ValidationPipe())
  @UseGuards(JWTGuard)
  async getOffersByUserId(
    @Query() query: SearchOffersQuery,
  ): Promise<OfferEntity[]> {
    const offers = await this.offerService.findByUserId(query.freelancerId);
    return offers;
  }

  @Put('ChangeStatus')
  @UsePipes(new ValidationPipe())
  @UseGuards(JWTGuard)
  async update(@Body() updateStatusDto: UpdateStatusDto): Promise<OfferEntity> {
    const offer = await this.offerService.updateStatus(updateStatusDto);
    return offer;
  }

  @Get('getByJobId')
  @UsePipes(new ValidationPipe())
  @UseGuards(JWTGuard)
  async getByJobId(@Query('jobId') jobId: number): Promise<OfferEntity> {
    try {
      const offer = await this.offerService.findByJobId(jobId);

      return offer;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
