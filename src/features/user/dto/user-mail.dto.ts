import { IsEmail, IsString } from 'class-validator';

export class UserMailDto {
  @IsEmail()
  to: string;

  @IsString()
  subject: string;

  @IsString()
  body: string;
}
