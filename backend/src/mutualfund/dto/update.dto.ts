import { PartialType } from '@nestjs/mapped-types';
import { CreateMutualFundDto } from './createmf.dto';

export class UpdateDto extends PartialType(CreateMutualFundDto) {}
