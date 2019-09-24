import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ unique: true, nullable: false })
    public userName!: string;

    @Column({ nullable: false })
    public hashedPassword!: string;

    @OneToMany((t) => RoleEntity, (role) => role.user)
    public roles!: RoleEntity[];
}
