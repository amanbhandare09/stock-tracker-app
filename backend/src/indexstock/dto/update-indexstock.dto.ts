import { PartialType } from '@nestjs/mapped-types';
import { CreateIndexstockDto } from './create-indexstock.dto';

export class UpdateIndexstockDto extends PartialType(CreateIndexstockDto) {}
