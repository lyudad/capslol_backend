import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class CreateProposalDto {
  @IsNumber()
  @IsNotEmpty()
  jobId: number;

  @IsNumber()
  @IsNotEmpty()
  freelancerId: number;

  @IsNumber()
  @IsNotEmpty()
  hourlyRate: number;

  @IsString()
  @IsNotEmpty()
  coverLetter: string;
}
