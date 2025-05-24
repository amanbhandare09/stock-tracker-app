import {IsNotEmpty, IsString } from 'class-validator';

export class CreateIndexstockDto {
  @IsString()
  @IsNotEmpty()
  index_id: string;

  @IsNotEmpty()
  @IsString()
  stock_id: string;

}
