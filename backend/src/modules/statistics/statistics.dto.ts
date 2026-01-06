import { IsString } from 'class-validator';

export class UpdateStatisticsDto {
  @IsString()
  instructorCount: string;

  @IsString()
  programCount: string;

  @IsString()
  partnerCount: string;

  @IsString()
  historyYears: string;
}
