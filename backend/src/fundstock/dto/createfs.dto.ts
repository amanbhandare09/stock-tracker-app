import { IsNumber, IsDecimal, IsNotEmpty, IsString } from 'class-validator';

export class CreateFundStockDto {
  @IsNotEmpty()
  fund_name: string;

  @IsNotEmpty()
  isin_id: string;

  @IsString()
  month_year: string;

  @IsNumber()
  @IsNotEmpty()
  shares_held: number;

  @IsDecimal()
  @IsNotEmpty()
  holding_percentage: number;
}
