import { Controller, UseGuards, Request, Post, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Roles } from '@server/decorators/role';
import { RoleGuard } from '@server/guards/role.guard';
import { Public } from '@server/decorators/public';
import { LocalAuth } from '@server/decorators/local-auth';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Get('me')
    public async getProfile(@Request() req: any) {
        return req.user;
    }

    @LocalAuth()
    @Post('login')
    public async login(@Request() req: any) {
        return this.authService.login(req.user);
    }

    @Roles('admin')
    @Get('admin')
    public async checkAdminOnly() {
        return { message: 'authorized' };
    }

}
