import { Column, ManyToOne, Entity, PrimaryGeneratedColumn } from 'typeorm';
import User from '@domain/user/User';

@Entity('pairs')
export default class Pair {
    constructor(
        name: string,
        score: number,
        userId1: string,
        userId2?: string,
        pairId?: string
    ) {
        this.name = name;
        this.score = score;
        this.userId1 = userId1;
        this.userId2 = userId2;
        this.pairId = pairId;
    }

    @PrimaryGeneratedColumn('uuid')
    pairId: string;

    @Column({
        unique: true,
    })
    name: string;

    @Column()
    score: number;

    @ManyToOne(() => User, (pair) => Pair)
    userId1: String;

    @ManyToOne(() => User, (pair) => Pair)
    @Column({
        nullable: true,
    })
    userId2: String | null;
}
