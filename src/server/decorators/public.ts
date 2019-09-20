import { RoleType } from '../user/role.entity';
import { SetMetadata } from '@nestjs/common';

export const Public = () => SetMetadata('public', true);
