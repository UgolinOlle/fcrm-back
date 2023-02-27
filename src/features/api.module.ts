import { Module } from '@nestjs/common';

import { AuthModule } from '@features/auth/auth.module';
import { UserModule } from '@features/user/user.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [AuthModule, UserModule, ProjectModule],
})
export class ApiModule {}
