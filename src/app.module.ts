import ConfigModule from './config-module';
import TypeOrmModule from './typeorm-module';
import { Module } from '@nestjs/common';
import { VilnyyModule } from './vilnyy/vilnyy.module';
import { VilnyyBankModule } from './vilnyy-bank/vilnyy-bank.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule,
    VilnyyModule,
    VilnyyBankModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 5
    })
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
  controllers: [AppController]
})
export class AppModule {}
