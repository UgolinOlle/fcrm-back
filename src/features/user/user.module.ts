import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { MailerModule } from '@shared/mailer/mailer.module';
import { ProjectEntity } from '@features/project/entities/project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ProjectEntity]),
    MailerModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
