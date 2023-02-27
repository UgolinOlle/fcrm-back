import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '@features/user/user.module';
import { LocalStrategy } from '@features/auth/strategies/local.strategy';
import { JwtStrategy } from '@features/auth/strategies/jwt.strategy';
import { MailerModule } from '@shared/mailer/mailer.module';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    PassportModule,
    MailerModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('authentication.secretKey'),
        signOptions: {
          expiresIn: '1d',
        },
      }),
    }),
  ],
  providers: [ConfigService, AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
