import { Controller, UseGuards, Request, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    @UseGuards(AuthGuard('local'))
    @Post('login')
    public async login(@Request() req: any) {
        return req.user;
    }
}
