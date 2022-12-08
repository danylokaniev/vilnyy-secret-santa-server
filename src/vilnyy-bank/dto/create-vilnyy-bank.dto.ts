import { OmitType } from '@nestjs/swagger';
import { VilnyyBank } from '../vilnyy-bank.entity';

export class CreateVilnyyBankDto extends OmitType(VilnyyBank, [
  'id',
  'createdAt',
] as const) {}
