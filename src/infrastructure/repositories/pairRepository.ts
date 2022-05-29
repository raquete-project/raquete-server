import IPairRepository from '@domain/pair/IPairRepository';
import Pair from '@domain/pair/Pair';
import User from '@domain/user/User';
import { getRepository } from 'typeorm';

class PairRepository implements IPairRepository {
    async findAllPairs() {
        const query = 'SELECT * FROM pairs ORDER BY name';

        return await getRepository(Pair).query(query);
    }

    async createPair(pair: Pair) {
        const repository = getRepository(Pair);

        const existsPair = await repository.query(
            `SELECT "pairId" FROM pairs WHERE name = '${pair.name}'`
        );

        if (existsPair.length > 0) {
            return {
                status: 'error',
                message: 'Duplicate pair',
                payload: null,
            };
        }

        return await repository.query(
            `INSERT INTO pairs (name, score, "userId1") VALUES ('${pair.name}', '${pair.score}', '${pair.userId1}') RETURNING *`
        );
    }

    async joinPair(pairId: string, userId: string) {
        const repository = getRepository(User);
        const pair = await repository.query(
            `SELECT * FROM pairs WHERE "pairId" = '${pairId}'`
        );

        if (pair.length === 0) {
            return {
                status: 'error',
                message: 'Pair not found',
                payload: null,
            };
        } else if (pair[0].userId2) {
            return {
                status: 'error',
                message: 'Pair is full',
                payload: null,
            };
        }

        return await repository.query(
            `UPDATE pairs SET "userId2" = '${userId}' WHERE "pairId" = '${pairId}' RETURNING *`
        );
    }

    async deletePair(pairId: string) {
        const repository = getRepository(Pair);

        return await repository.query(
            `DELETE FROM pairs WHERE "pairId" = '${pairId}' RETURNING *`
        );
    }
}

export default new PairRepository();
