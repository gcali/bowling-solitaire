import { Controller, Get, Put, Body, Post } from '@nestjs/common';
import { UserService } from './user.service';

interface InsertPayload {
    userName: string;
    password: string;
}

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {

    }

    @Get()
    public async getAllUsers() {
        return await this.userService.getAllUsers();
    }

    @Post()
    public async insertUser(@Body() payload: InsertPayload) {
        await this.userService.addUser({
            userName: payload.userName,
        }, payload.password);
    }
}
