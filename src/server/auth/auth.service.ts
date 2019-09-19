import { Injectable } from '@nestjs/common';
import { UserService } from '@server/user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}
    public async validateUser(username: string, password: string): Promise<{userName: string} | null> {
        console.log(this.userService.find);
        const user = await this.userService.find(username);
        if (user === null || user.password !== password) {
            return null;
        }
        return { userName: user.userName };
    }
}
