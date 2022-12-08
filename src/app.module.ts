import ConfigModule from './config-module';
import TypeOrmModule from './typeorm-module';
import { Module } from '@nestjs/common';
import { VilnyyModule } from './vilnyy/vilnyy.module';

@Module({ imports: [ConfigModule, TypeOrmModule, VilnyyModule] })
export class AppModule {}
