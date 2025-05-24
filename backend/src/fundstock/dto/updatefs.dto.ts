import { PartialType } from '@nestjs/mapped-types';
import { CreateFundStockDto } from './createfs.dto';

export class UpdateFundStockDto extends PartialType(CreateFundStockDto) {}
