import IMatchRepository from '@domain/match/IMatchRepository';
import Match from '@domain/match/Match';
import { getRepository } from 'typeorm';

class MatchRepository implements IMatchRepository {
    async findAllMatches() {
        const repository = getRepository(Match);

        return await repository.find();
    }

    async createMatch(match: Match) {
        const repository = getRepository(Match);

        return await repository.query(
            `INSERT INTO matches (date, result, "pairId1", "pairId2", "locationId") VALUES ('${match.date}', '${match.result}', '${match.pairId1}', '${match.pairId2}', '${match.locationId}') RETURNING *`
        );
    }
}

export default new MatchRepository();
