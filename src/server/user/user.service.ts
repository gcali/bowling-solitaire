import { Injectable } from '@nestjs/common';
import { Entity, PrimaryGeneratedColumn, Column, Index, Connection, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleType } from './role.entity';

export interface User {
    userName: string;
    roles?: RoleType[];
}

export interface UserComplete extends User {
    password: string;
}

@Injectable()
export class UserService {
    private readonly userRepo: Repository<UserEntity>;
    constructor(private readonly connection: Connection) {
        this.userRepo = connection.getRepository<UserEntity>(UserEntity);
    }
    public async find(username: string): Promise<UserComplete | null> {
        const dbUser = await this.userRepo.findOne({ where: { userName: username }, relations: ['roles'] });
        if (!dbUser) {
            return null;
        } else {
            const roles = dbUser.roles.map((r) => r.role);
            return {
                userName: dbUser.userName,
                password: dbUser.hashedPassword,
                roles: roles || [],
            };
        }
    }
    public async getAllUsers(): Promise<User[]> {
        const dbUsers = await this.userRepo.find();
        return dbUsers.map((u) => ({
            userName: u.userName,
        }));
    }

    public async addUser(user: User, password: string): Promise<void> {
        const dbUser = new UserEntity();
        dbUser.userName = user.userName;
        dbUser.hashedPassword = password;
        await this.userRepo.save(dbUser);
    }
}
