import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  UseGuards,
  HttpException,
  HttpStatus,
  Query,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import JWTGuard from '../auth/guards/jwt.guard';
import ContractService from './contract.service';
import CreateContractDto from './dto/create-contract.dto';
import GetContractParam from './dto/get-contract.param';
import SearchByOwnerQuery from './dto/search-by-owner.query';
import UpdateContractDto from './dto/update-contract.dto';
import ContractEntity from './entities/contract.entity';
import SearchByFreelancerQuery from './dto/search-by-freelancer.query';

@ApiTags('Contracts')
@ApiBearerAuth()
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer $your.token',
})
@Controller('contract')
export default class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(JWTGuard)
  async create(
    @Body() createContractDto: CreateContractDto,
  ): Promise<ContractEntity> {
    try {
      const response = await this.contractService.create(createContractDto);
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('getById/:id')
  @UsePipes(new ValidationPipe())
  @UseGuards(JWTGuard)
  async findOne(@Param() param: GetContractParam): Promise<ContractEntity> {
    try {
      const response = this.contractService.findContractById(param.id);
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(): Promise<ContractEntity[]> {
    try {
      const response = this.contractService.findAll();
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('search')
  @UsePipes(new ValidationPipe())
  @UseGuards(JWTGuard)
  async getOffersByFreelancer(
    @Query() query: SearchByFreelancerQuery,
  ): Promise<ContractEntity[]> {
    try {
      const contracts = await this.contractService.findByFreelancer(
        query.freelancerId,
      );
      return contracts;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('searchByOwnerId')
  @UsePipes(new ValidationPipe())
  async searchByOwnerId(
    @Query() searchQuery: SearchByOwnerQuery,
  ): Promise<ContractEntity[]> {
    try {
      const { ownerId } = searchQuery;
      const jobs = await this.contractService.searchByOwnerId(ownerId);
      return jobs;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('changeStatus')
  @UsePipes(new ValidationPipe())
  @UseGuards(JWTGuard)
  async update(
    @Body() updateContractStatusDto: UpdateContractDto,
  ): Promise<ContractEntity> {
    const updatedStatus = await this.contractService.updateContractStatus(
      updateContractStatusDto,
    );
    return updatedStatus;
  }
}
