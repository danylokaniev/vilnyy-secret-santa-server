import ConfigModule from './config-module';
import TypeOrmModule from './typeorm-module';
import { Module } from '@nestjs/common';
import { VilnyyModule } from './vilnyy/vilnyy.module';
import { VilnyyBankModule } from './vilnyy-bank/vilnyy-bank.module';

@Module({
  imports: [ConfigModule, TypeOrmModule, VilnyyModule, VilnyyBankModule]
})
export class AppModule {}
