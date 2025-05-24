import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateMutualFundDto {


  @IsString()
  fund_name: string;

  @IsString()
  amc_short_name: string;

  @IsOptional()
  @IsString()
  fund_type?: string;

  @IsOptional()
  @IsNumber({ allowNaN: false }, { each: true })
  total_assets?: number;

  @IsOptional()
  @IsNumber({ allowNaN: false }, { each: true })
  nav?: number;

  @IsOptional()
  @IsNumber({ allowNaN: false }, { each: true })
  expense_ratio?: number;

  @IsOptional()
  @IsString()
  manager_name?: string;
}
