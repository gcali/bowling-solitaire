import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RoleType } from '@server/user/role.entity';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) { }
  public async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const requestedRoles = this.reflector.get<RoleType[]>('roles', context.getHandler());
    if (!requestedRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest() as any;
    if (request.user && request.user.roles) {
      const roles = request.user.roles as RoleType[];
      if (roles) {
        const isValid = requestedRoles
          .map((role) => roles.indexOf(role) >= 0)
          .reduce((curr, next) => curr && next, true);
        return isValid;
      }
    }


    return false;
  }
}
