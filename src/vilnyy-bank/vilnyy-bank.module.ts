import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { VilnyyBank } from './vilnyy-bank.entity';
import { Vilnyy } from 'src/vilnyy/vilnyy.entity';
import { HttpModule } from '@nestjs/axios';
import { VilnyyBankController } from './vilnyy-bank.controller';
import { VilnyyBankService } from './vilnyy-bank.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vilnyy, VilnyyBank]),
    HttpModule,
    ScheduleModule.forRoot(),
  ],
  providers: [VilnyyBankService],
  controllers: [VilnyyBankController],
})
export class VilnyyBankModule {}
