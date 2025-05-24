import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateStockDto {

    @IsString()
    isin_id: string;

    @IsOptional()
    @IsNumber()
    open: number;

    @IsOptional()
    @IsNumber()
    close: number;

    @IsOptional()
    @IsNumber()
    w_h: number;

    @IsOptional()
    @IsNumber()
    w_l: number;

    @IsOptional()
    @IsString()
    exchange?: string;
}