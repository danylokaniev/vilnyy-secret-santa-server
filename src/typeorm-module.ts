import { TypeOrmModule } from '@nestjs/typeorm';
import { VilnyyBank } from './vilnyy-bank/vilnyy-bank.entity';
import { Vilnyy } from './vilnyy/vilnyy.entity';

export default TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [Vilnyy, VilnyyBank],
  migrationsTableName: 'migration',
  migrations: ['src/migration/*.ts'],
  synchronize: true
});
