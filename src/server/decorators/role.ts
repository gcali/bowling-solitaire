import { RoleType } from '../user/role.entity';
import { SetMetadata } from '@nestjs/common';

// tslint:disable-next-line: variable-name
export const Roles = (...roles: RoleType[]) => SetMetadata('roles', roles);
