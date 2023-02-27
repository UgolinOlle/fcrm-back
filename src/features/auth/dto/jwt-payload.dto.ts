import { IsEmail, IsOptional, IsString } from 'class-validator';

import { UserEntity } from '@features/user/entities/user.entity';

export class JwtPayloadDto {
  @IsString()
  id: UserEntity['id'];

  @IsEmail()
  email: UserEntity['email'];

  @IsString()
  @IsOptional()
  firstName?: UserEntity['firstName'];

  @IsString()
  @IsOptional()
  lastName?: UserEntity['lastName'];

  @IsString()
  refreshToken?: UserEntity['refreshToken'];

  @IsOptional()
  role?: UserEntity['role'];

  @IsOptional()
  status: UserEntity['status'];
}
