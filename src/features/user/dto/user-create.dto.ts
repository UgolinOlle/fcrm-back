import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { UserEntity } from '@features/user/entities/user.entity';

export class UserCreateDto {
  @IsEmail()
  @IsNotEmpty()
  email: UserEntity['email'];

  @IsAlpha()
  @IsOptional()
  firstName?: UserEntity['firstName'];

  @IsAlpha()
  @IsOptional()
  lastName?: UserEntity['lastName'];

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  role?: UserEntity['role'];
}

export class UserCreateOutput {
  user: UserEntity;
}
