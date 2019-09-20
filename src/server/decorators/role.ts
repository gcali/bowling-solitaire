import { RoleType } from '../user/role.entity';
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: RoleType[]) => SetMetadata('roles', roles);
