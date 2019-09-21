import { Roles } from '@server/decorators/role';
import { Controller, Get, Put, Body, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from '@server/decorators/public';
import { RoleType } from './role.entity';

interface InsertPayload {
    userName: string;
    password: string;
}

interface UpdatePayload {
    userName: string;
    roles: RoleType[];
}

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {

    }

    @Roles('admin')
    @Get()
    public async getAllUsers() {
        return await this.userService.getAllUsers();
    }

    @Public()
    @Post()
    public async insertUser(@Body() payload: InsertPayload) {
        await this.userService.addUser({
            userName: payload.userName,
        }, payload.password);
    }

    @Roles('admin')
    @Put('roles')
    public async updateRoles(@Body() payload: UpdatePayload) {
        await this.userService.updateRoles(payload);
    }
}
