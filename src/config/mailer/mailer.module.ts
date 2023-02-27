import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import mailer from './mailer';

/**
 * Import and provide mailer configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mailer],
      validationSchema: Joi.object({
        EMAIL_HOST: Joi.string().required(),
        EMAIL_PORT: Joi.number().default(465),
        USER_EMAIL: Joi.string().required(),
        USER_PASSWORD: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class MailerConfigModule {}
