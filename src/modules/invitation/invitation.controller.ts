import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  UseGuards,
  ValidationPipe,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import PageOptionsDto from 'src/shared/DTOs/page-options.dto';
import PageDto from 'src/shared/DTOs/page.dto';
import InvitationService from './invitation.service';
import CreateInvitationDto from './dto/create-invitation.dto';
import JWTGuard from '../auth/guards/jwt.guard';
import InvitationEntity from './entities/invitation.entity';
import SearchInvitationsQueryDto from './dto/search-ivitations.dto';

@ApiTags('Invitation')
@ApiBearerAuth()
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer $your.token',
})
@Controller('invitation')
export default class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(JWTGuard)
  async create(
    @Body() createInvitationDto: CreateInvitationDto,
  ): Promise<InvitationEntity> {
    try {
      const payload = await this.invitationService.create(createInvitationDto);
      return payload;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @UsePipes(new ValidationPipe())
  @UseGuards(JWTGuard)
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<InvitationEntity>> {
    try {
      const invitations = await this.invitationService.findAll(pageOptionsDto);
      return invitations;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('filter')
  async findFilteredAllProposals(
    @Query() searchByUserDto: SearchInvitationsQueryDto,
  ): Promise<PageDto<InvitationEntity>> {
    try {
      const response =
        this.invitationService.findFilteredAllInvitations(searchByUserDto);
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
