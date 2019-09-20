import { Controller, UseGuards, Request, Post, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Roles } from '@server/decorators/role';
import { RoleGuard } from '@server/guards/role.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @UseGuards(AuthGuard())
    @Get('me')
    public async getProfile(@Request() req: any) {
        return req.user;
    }
    @UseGuards(AuthGuard('local'))
    @Post('login')
    public async login(@Request() req: any) {
        return this.authService.login(req.user);
    }

    @UseGuards(AuthGuard(), RoleGuard)
    @Roles('admin')
    @Get('admin')
    public async checkAdminOnly() {
        return { message: 'authorized' };
    }

}
