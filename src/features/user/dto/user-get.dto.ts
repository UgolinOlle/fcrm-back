import { IsNotEmpty } from 'class-validator';
import { UserEntity } from '@features/user/entities/user.entity';

export class UserGetDto {
  @IsNotEmpty()
  id: UserEntity['id'];
}
