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
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import JWTGuard from '../auth/guards/jwt.guard';
import ContractService from './contract.service';
import CreateContractDto from './dto/create-contract.dto';
import GetContractParam from './dto/get-contract.param';
import ContractEntity from './entities/contract.entity';

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
}
