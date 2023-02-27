import { Role } from '@core/enums/role';
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
