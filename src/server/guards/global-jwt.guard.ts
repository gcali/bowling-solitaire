import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class GlobalJwtGuard extends AuthGuard('jwt') {

  constructor(private readonly reflector: Reflector) {
    super();
  }
  public canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (this.reflector.get<boolean>('public', context.getHandler())) {
      return true;
    }
    return super.canActivate(context);
  }
}
