import { SetMetadata } from '@nestjs/common';
import { RolesEnum } from './roles.enum';

export const ROLES_KEY = 'roles';
export const Role = (...roles: RolesEnum[]) => SetMetadata(ROLES_KEY, roles);
