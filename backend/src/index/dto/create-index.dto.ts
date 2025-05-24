import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateIndexDto {

  @IsString()
  index_name: string;

  @IsOptional()
  @IsNumber()
  open: number;

  @IsOptional()
  @IsNumber()
  close: number;

  @IsOptional()
  @IsNumber()
  ltp: number;

  @IsOptional()
  @IsNumber()
  w_h: number;

  @IsOptional()
  @IsNumber()
  w_l: number;

  @IsString()
  index_cat: string;

  @IsOptional()
  @IsBoolean()  
  is_active: boolean;
}
