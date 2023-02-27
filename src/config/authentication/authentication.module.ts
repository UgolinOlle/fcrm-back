import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';

import authentication from './authentication';

/**
 * Import and provide auth configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authentication],
      validationSchema: Joi.object({
        JWT_SECRET_KEY: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class AuthenticationModule {}
