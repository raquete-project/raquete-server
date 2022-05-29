import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import User from '@domain/user/User';
import Match from '@domain/match/Match';

@Entity('locations')
export default class Location {
    constructor(address: string, locationId?: string) {
        this.address = address;
        this.locationId = locationId;
    }

    @PrimaryGeneratedColumn('uuid')
    locationId: string;

    @Column({
        unique: true,
    })
    address: string;

    @OneToMany(() => Location, () => User)
    users: User[];

    @OneToMany(() => Location, () => Match)
    matches: Match[];
}
