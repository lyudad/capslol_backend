import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import CreateProposalDto from './dto/create-proposal.dto';
import ProposalEntity from './entities/proposal.entity';
import ProposalsService from './proposals.service';
import SearchQuery from './dto/search.query';

@ApiTags('Proposals')
@Controller('proposals')
export default class ProposalsController {
  constructor(private readonly proposalService: ProposalsService) {}

  @ApiBody({
    type: CreateProposalDto,
  })
  @Post()
  @UsePipes(new ValidationPipe())
  async createProposal(
    @Body() createProposalDto: CreateProposalDto,
  ): Promise<ProposalEntity> {
    try {
      const createdProposal = await this.proposalService.createProposal(
        createProposalDto,
      );

      return createdProposal;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiResponse({
    type: ProposalEntity,
  })
  @Get()
  async getAll(): Promise<ProposalEntity[]> {
    try {
      const allProposals = await this.proposalService.getAll();

      return allProposals;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('getById')
  @UsePipes(new ValidationPipe())
  async getById(@Query('proposal') id: number): Promise<ProposalEntity> {
    try {
      const singleProposal = await this.proposalService.getOne(id);

      return singleProposal;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('deleteById/:id')
  @UsePipes(new ValidationPipe())
  async deleteProposal(@Param() id: number): Promise<ProposalEntity> {
    try {
      const deletedProposal = await this.proposalService.deleteProposal(id);

      return deletedProposal;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Get('search')
  @UsePipes(new ValidationPipe())
  async searchByFreelancerId(
    @Query() searchQuery: SearchQuery,
  ): Promise<ProposalEntity[]> {
    try {
      const { freelancerId } = searchQuery;
      const proposals = await this.proposalService.searchByFreelancerId(
        freelancerId,
      );
      return proposals;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
