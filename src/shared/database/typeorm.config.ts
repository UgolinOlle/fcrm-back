import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME || 'jade',
  password: process.env.DB_PASSWORD || 'jade',
  database: process.env.DB_DATABASE || 'jade',
  entities: ['dist/features/**/entities/*.entity{.ts,.js}'],
  logging: false,
  migrations: ['dist/migrations/**/*{.ts,.js}'],
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
