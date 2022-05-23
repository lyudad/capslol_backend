/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import CreateProposalDto from './dto/create-proposal.dto';
import ProposalEntity from './entities/proposal.entity';
import ProposalsService from './proposals.service';

@Controller('proposals')
export default class ProposalsController {
  constructor(private readonly proposalService: ProposalsService) {}

  @Post()
  // eslint-disable-next-line consistent-return
  async createProposal(
    @Body() createProposalDto: CreateProposalDto,
  ): Promise<ProposalEntity> {
    try {
      const createdProposal = await this.proposalService.createProposal(
        createProposalDto,
      );

      return createdProposal;
    } catch (error) {
      // return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getAll(): Promise<any> {
    try {
      const allProposals = await this.proposalService.getAll();

      return allProposals;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('getOne/:id')
  async getSingleProposal(@Param() id: number): Promise<any> {
    try {
      const singleProposal = await this.proposalService.getSingleProposal(id);

      return singleProposal;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('deleteOne/:id')
  async delete(@Param() id: number): Promise<any> {
    try {
      const deletedProposal = await this.proposalService.delete(id);

      return deletedProposal;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
