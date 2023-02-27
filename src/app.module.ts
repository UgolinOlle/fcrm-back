import { APP_FILTER } from '@nestjs/core';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { ConfigurationModule } from '@/config/configuration.module';
import { ApiModule } from '@features/api.module';
import { DatabaseModule } from '@shared/database/database.module';
import { NotFoundExceptionFilter } from '@core/filters/no-found-exception.filter';
import { LoggerMiddleware } from '@core/middlewares/logger-middleware.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigurationModule,
    ApiModule,
    EventEmitterModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
