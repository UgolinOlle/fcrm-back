import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as dotenv from 'dotenv';
import * as session from 'express-session';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

import { AppModule } from '@app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);

  // -- Load .env file
  dotenv.config();

  // -- Session
  app.use(
    session({
      secret: config.get<string>('authentication.secretKey'),
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },
    }),
  );

  // -- Security
  app.use(helmet());
  app.enableCors({
    origin: true,
  });
  app.use(
    rateLimit({
      windowMs: 10 * 60 * 1000,
      max: 1000,
      standardHeaders: true,
      legacyHeaders: false,
      skipSuccessfulRequests: false,
    }),
  );

  // -- Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(config.get('app.port'));
  Logger.log(
    `🚀 - App launched successfully on port: ${config.get('app.port')}.`,
    'Bootstrap',
  );
}

bootstrap();
