import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Pair from '@domain/pair/Pair';
import Location from '@domain/location/Location';

@Entity('matches')
export default class Match {
    constructor(
        date: Date,
        result: string,
        pair1: string,
        pair2: string,
        locationId: string,
        matchId?: string
    ) {
        this.date = date;
        this.result = result;
        this.pair1 = pair1;
        this.pair2 = pair2;
        this.locationId = locationId;
        this.matchId = matchId;
    }

    @PrimaryGeneratedColumn('uuid')
    matchId: string;

    @Column()
    date: Date;

    @Column()
    result: string;

    @ManyToOne(() => Pair, () => Match, {
        cascade: true,
        eager: true,
    })
    pair1: string;

    @ManyToOne(() => Pair, () => Match, {
        cascade: true,
        eager: true,
    })
    pair2: string;

    @ManyToOne(() => Location, () => Match)
    locationId: string;
}
