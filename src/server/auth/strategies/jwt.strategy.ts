import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@server/user/user.service';
import { jwtConstants } from '@server/utils/config';
import { RoleType } from '@server/user/role.entity';

export interface JwtPayload {
    username: string;
    sub: string;
    roles: RoleType[];
}

export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secretKey,
        } as StrategyOptions);
    }
    public async validate(payload: JwtPayload): Promise<User> {
        return {
            userName: payload.username,
            roles: payload.roles,
        };
    }
}
