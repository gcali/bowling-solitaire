import { Entity, Index, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class UserEntity {
    @PrimaryColumn()
    public userName!: string;

    @Column()
    public hashedPassword!: string;
}
