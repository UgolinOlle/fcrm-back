import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectEntity } from '@features/project/entities/project.entity';
import { UserModule } from '@features/user/user.module';
import { UserEntity } from '@features/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity, UserEntity]), UserModule],
  providers: [ProjectService],
  controllers: [ProjectController],
  exports: [ProjectService],
})
export class ProjectModule {}
