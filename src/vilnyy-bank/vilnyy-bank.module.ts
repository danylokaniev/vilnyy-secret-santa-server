import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VilnyyBank } from './vilnyy-bank.entity';
import { Vilnyy } from 'src/vilnyy/vilnyy.entity';
import { VilnyyController } from 'src/vilnyy/vilnyy.controller';
import { VilnyyService } from 'src/vilnyy/vilnyy.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vilnyy, VilnyyBank])],
  providers: [VilnyyService],
  controllers: [VilnyyController],
})
export class VilnyyModule {}
