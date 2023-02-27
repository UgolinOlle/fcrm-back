import app from './app/app';
import authentication from './authentication/authentication';
import database from './database/database';
import mailer from './mailer/mailer';

export { AppConfigModule } from './app/app.module';
export { DatabaseConfigModule } from './database/database.module';
export { AuthenticationModule } from './authentication/authentication.module';
export { MailerConfigModule } from './mailer/mailer.module';

export default [app, authentication, database, mailer];
