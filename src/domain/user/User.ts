import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert,
    BeforeUpdate,
    ManyToOne,
} from 'typeorm';

import bcrypt from 'bcrypt';

import { SkillLevel } from '../@types/SkillLevel';
import Location from '@domain/location/Location';

@Entity('users')
export default class User {
    constructor(
        name: string,
        email: string,
        password: string,
        skillLevel: SkillLevel,
        locationId: string,
        userId?: string
    ) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.skillLevel = skillLevel;
        this.locationId = locationId;
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

    @ManyToOne(() => Location, (user) => User)
    locationId: string;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }
}
