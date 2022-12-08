import { Module } from '@nestjs/common';
import { Vilnyy } from './vilnyy.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VilnyyService } from './vilnyy.service';
import { VilnyyController } from './vilnyy.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Vilnyy])],
  providers: [VilnyyService],
  controllers: [VilnyyController],
})
export class VilnyyModule {}
