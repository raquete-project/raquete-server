import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { SkillLevel } from '../@types/SkillLevel';
import Location from '@domain/location/Location';

@Entity('users')
export default class User {
    constructor(
        name: string,
        email: string,
        password: string,
        skillLevel: SkillLevel,
        score: number,
        locationId: string,
        userId?: string
    ) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.skillLevel = skillLevel;
        this.score = score;
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

    @Column()
    score: number;

    @ManyToOne(() => Location, (user) => User)
    locationId: string;
}
