import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ['dist/features/**/entities/*.entity{.ts,.js}'],
      logging: false,
      migrations: ['dist/migrations/**/*{.ts,.js}'],
      synchronize: false,
    }),
  ],
})
export class DatabaseModule {}
