import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Pair from '@domain/pair/Pair';
import Location from '@domain/location/Location';

@Entity('matches')
export default class Match {
    constructor(
        date: Date,
        result: string,
        pairId1: string,
        pairId2: string,
        locationId: string,
        matchId?: string
    ) {
        this.date = date;
        this.result = result;
        this.pairId1 = pairId1;
        this.pairId2 = pairId2;
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
    pairId1: string;

    @ManyToOne(() => Pair, () => Match, {
        cascade: true,
        eager: true,
    })
    pairId2: string;

    @ManyToOne(() => Location, () => Match)
    locationId: string;
}
