import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateAMCDto {

  @IsString()
  amc_name: string;

  @IsString()
  amc_short_name: string;

  @IsOptional()  // Use this if the field is not required
  @IsString()
  @IsOptional()
  amc_description?: string;

  @IsNumber()
  mf_offered: number;  // Change to a single number if this represents the count
}
