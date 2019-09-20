import { Entity, Index, Column, PrimaryColumn, ManyToMany, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';

export type RoleType = 'admin';

@Entity()
export class RoleEntity {

    @PrimaryGeneratedColumn()
    public id!: number;

    @ManyToOne((t) => UserEntity, (user) => user.roles, { nullable: false })
    public user!: UserEntity;

    @Column({ type: 'varchar', nullable: false })
    public role!: RoleType;
}

