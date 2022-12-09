import { OmitType } from '@nestjs/swagger';
import { Vilnyy } from '../vilnyy.entity';

export class CreateVilnyyDto extends OmitType(Vilnyy, ['id', 'createdAt'] as const) {}
