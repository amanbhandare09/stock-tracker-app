import { IsString, IsUUID } from 'class-validator';

export class searchFund {
  @IsUUID()
  id: string;

  @IsString()
  name: string;
}