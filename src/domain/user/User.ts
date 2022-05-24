import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert,
    BeforeUpdate,
    OneToMany,
} from 'typeorm';

import bcrypt from 'bcrypt';

import { SkillLevel } from '../@types/SkillLevel';

@Entity('users')
export default class User {
    constructor(
        name: string,
        email: string,
        password: string,
        skillLevel: SkillLevel,
        userId?: string
    ) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.skillLevel = skillLevel;
        this.userId = userId;
    }

    @PrimaryGeneratedColumn('uuid')
    userId: string;

    @Column()
    name: string;

    @Column({
        unique: true,
    })
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: SkillLevel,
        default: SkillLevel.REGULAR,
    })
    skillLevel: SkillLevel = SkillLevel.REGULAR;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }
}
