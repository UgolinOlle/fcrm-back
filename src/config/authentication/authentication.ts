import { registerAs } from '@nestjs/config';

export default registerAs('authentication', () => ({
  secretKey: process.env.JWT_SECRET_KEY,
}));
