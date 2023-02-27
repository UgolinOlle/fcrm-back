import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppConfigModule } from './app/app.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { DatabaseConfigModule } from './database/database.module';
import { MailerConfigModule } from './mailer/mailer.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseConfigModule,
    AuthenticationModule,
    MailerConfigModule,
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigurationModule {}
