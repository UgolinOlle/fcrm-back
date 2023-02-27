import { Body, Controller, Inject, Post } from '@nestjs/common';

import { AuthService } from '@features/auth/auth.service';
import { AuthLoginDto, AuthOutput } from '@features/auth/dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: AuthLoginDto): Promise<AuthOutput> {
    const user = await this.authService.validate(body.email, body.password);
    return await this.authService.login(user);
  }
}
