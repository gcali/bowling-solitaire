import { Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { Entity, PrimaryGeneratedColumn, Column, Index, Connection, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleType, RoleEntity } from './role.entity';
import { DbValidationService } from '@server/db/db-validation.service';
import { UserSignUpError, userExisting } from '@common/codes/auth';

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
    constructor(private readonly connection: Connection, private readonly dbValidationService: DbValidationService) {
        this.userRepo = connection.getRepository<UserEntity>(UserEntity);
    }
    public async updateRoles(payload: User) {
        const dbUser = await this.findWithRoles(payload.userName);
        if (dbUser !== null) {
            this.connection.manager.remove(dbUser.roles);
            const newRoles = payload.roles!.map((r) => {
                const newRole = new RoleEntity();
                newRole.role = r;
                newRole.user = dbUser;
                return newRole;
            });
            await this.connection.manager.save(newRoles);
        }
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
        try {
            const dbUser = new UserEntity();
            dbUser.userName = user.userName;
            dbUser.hashedPassword = password;
            await this.userRepo.save(dbUser);
        } catch (e) {
            if (this.dbValidationService.isDuplicateException(e)) {
                throw new BadRequestException({ message: 'User already existing', code: userExisting });
            }
            throw e;
        }
    }

    private async findWithRoles(username: string): Promise<UserEntity | null> {
        const dbUser = await this.userRepo.findOne({ where: { userName: username }, relations: ['roles'] });
        return dbUser || null;
    }
}
