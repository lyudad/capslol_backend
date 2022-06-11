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
import InvitationService from './invitation.service';
import CreateInvitationDto from './dto/create-invitation.dto';
import JWTGuard from '../auth/guards/jwt.guard';
import InvitationEntity from './entities/invitation.entity';
import SearchInvitationsQuery from './dto/search-ivitations.dto';

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
  async findAll(): Promise<InvitationEntity[]> {
    try {
      const invitations = await this.invitationService.findAll();
      return invitations;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('getInvitations')
  @UsePipes(new ValidationPipe())
  @UseGuards(JWTGuard)
  async getInvitationsFreelancer(
    @Query() query: SearchInvitationsQuery,
  ): Promise<InvitationEntity[]> {
    const offers = await this.invitationService.findByFreelancer(
      query.freelancerId,
    );
    return offers;
  }
}
