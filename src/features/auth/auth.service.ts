import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

import { UserService } from '@features/user/user.service';
import { UserEntity } from '@features/user/entities/user.entity';
import { AuthOutput } from '@features/auth/dto/auth.dto';
import { JwtPayloadDto } from '@features/auth/dto/jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {}

  async validate(
    email: UserEntity['email'],
    password: UserEntity['password'],
  ): Promise<any> {
    const user = await this.userService.getByEmail(email);
    if (!user) throw new HttpException('User not found', 404);

    if (!compareSync(password, user.password)) {
      throw new HttpException('Password incorrect', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async login(user: UserEntity): Promise<AuthOutput> {
    const payload: JwtPayloadDto = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      refreshToken: user.refreshToken,
      role: user.role,
      status: user.status,
    };

    return { accessToken: this.jwtService.sign(payload) };
  }
}
