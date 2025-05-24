import { PartialType } from '@nestjs/mapped-types';
import { CreateRpaBotDto } from './create-rpa-bot.dto';

export class UpdateRpaBotDto extends PartialType(CreateRpaBotDto) {}
