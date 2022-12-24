import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Vilnyy } from '../vilnyy.entity';

export class UpdateVilnyyDto extends OmitType(Vilnyy, ['id', 'createdAt'] as const) {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string
}

