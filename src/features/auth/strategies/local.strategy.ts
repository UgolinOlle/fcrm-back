import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '@features/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {
    super({
      username: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = this.authService.validate(email, password);
    if (!user) throw new UnauthorizedException();

    return user;
  }
}
