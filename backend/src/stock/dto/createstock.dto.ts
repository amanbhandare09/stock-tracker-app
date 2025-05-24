import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateStockDto {
  
  @IsString()
  isin_id: string;

  @IsString()
  stock_symbol: string;

  @IsOptional()
  @IsString()
  stock_name?: string;

  @IsOptional()
  @IsString()
  sector?: string;

  @IsOptional()
  @IsNumber()
  market_cap?: number;

  @IsOptional()
  @IsNumber()
  current_price?: number;

  @IsOptional()
  @IsString()
  exchange?: string;
}
