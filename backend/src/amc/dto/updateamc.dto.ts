import { PartialType } from '@nestjs/mapped-types';
import { CreateAMCDto } from '../dto/createamc.dto';

export class UpdateDto extends PartialType(CreateAMCDto) {

}
