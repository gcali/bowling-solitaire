import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Public } from './public';

export const LocalAuth = () => ((target: any, key: string, descriptor: PropertyDescriptor): any => {
    Public()(target, key, descriptor);
    UseGuards(AuthGuard('local'))(target, key, descriptor);
}
);
