import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UserService, User } from '@server/user/user.service';
import { JwtPayload } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    public async validateUser(username: string, password: string): Promise<User | null> {
        const user = await this.userService.find(username);
        if (user === null || user.password !== password) {
            return null;
        }
        return { userName: user.userName, roles: user.roles };
    }

    public async login(user: User): Promise<any> {
        const payload: JwtPayload = {
            username: user.userName,
            sub: user.userName,
            roles: user.roles || [],
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
