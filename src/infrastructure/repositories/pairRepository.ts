import IPairRepository from '@domain/pair/IPairRepository';
import Pair from '@domain/pair/Pair';
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
        console.log(existsPair);
        if (existsPair.length > 0) {
            return {
                status: 'error',
                message: 'Duplicate pair',
                payload: null,
            };
        }

        return await repository.query(
            `INSERT INTO pairs (name, "userId1", "userId2") VALUES ('${pair.name}', '${pair.userId1}', '${pair.userId2}') RETURNING *`
        );
    }

    async joinPair(pairId: string, userId: string) {
        // const repository = getRepository(UserHasTeam);
        // const checkUserHasTeam = await repository.query(
        //     `SELECT "userHasTeamId" FROM "userHasTeam" WHERE "userId" = '${userId}' AND "teamId" = '${teamId}'`
        // );
        // if (checkUserHasTeam.length > 0) {
        //     return {
        //         status: 'error',
        //         message: 'User already belongs to this team',
        //         payload: null,
        //     };
        // }
        // return await repository.query(
        //     `INSERT INTO "userHasTeam" (active, "entryDate", "departureDate", "userId", "teamId") VALUES (true, NOW(), NOW(), '${userId}', '${teamId}') RETURNING *`
        // );
    }
}

export default new PairRepository();
