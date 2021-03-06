import { AuthService } from '../auth.service';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { userNotFound } from '@common/codes/auth';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({ session: false });
    }
    public async validate(username: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(username, password);
        if (user === null) {
            throw new UnauthorizedException({ message: 'User not found', code: userNotFound });
        }
        return user;
    }
}
