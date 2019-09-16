import { Injectable } from '@nestjs/common';
import { Entity, PrimaryGeneratedColumn, Column, Index, Connection, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

export interface User {
    userName: string;
}

@Injectable()
export class UserService {
    private readonly userRepo: Repository<UserEntity>;
    constructor(private readonly connection: Connection) {
        this.userRepo = connection.getRepository<UserEntity>(UserEntity);
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
