import { registerAs } from '@nestjs/config';

export default registerAs('mailer', () => ({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  fromEmail: process.env.USER_EMAIL,
  username: process.env.USER_EMAIL,
  password: process.env.USER_PASSWORD,
}));
