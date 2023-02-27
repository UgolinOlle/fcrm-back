import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';

import database from './database';

/**
 * Import and provide database configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [database],
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        DB_SSL: Joi.boolean().default(true),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class DatabaseConfigModule {}
