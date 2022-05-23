import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class CreateProposalDto {
  @IsNotEmpty()
  jobId: number;

  @IsNumber()
  @IsNotEmpty()
  freelancerId: number;

  @ApiProperty({
    description:
      ' Your hourly rate is the amount of money that you receive for each hour you spend working.(number $)',
  })
  @IsNumber()
  @IsNotEmpty()
  hourRate: number;

  @ApiProperty({
    description: 'Letter',
    example:
      'Dear Ms. Doe, I was excited to see your job listing for the Senior Digital Marketing position at Westward Strategies on Indeed.com. As a dynamic email marketing specialist with over two years of professional experience executing market research, analyzing consumer data, and running A/B tests to drive successful marketing campaigns, I’m confident that I would be a valuable asset to the team at Westward.',
  })
  @IsString()
  @IsNotEmpty()
  coverLetter: string;
}
