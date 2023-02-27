import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';

import app from './app';

/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [app],
      validationSchema: Joi.object({
        APP_NAME: Joi.string().default('MyApp'),
        APP_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        APP_URL: Joi.string().default('http://my-app.test'),
        APP_PORT: Joi.number().default(9000),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class AppConfigModule {}
