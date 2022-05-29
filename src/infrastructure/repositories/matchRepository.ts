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

        const newMatch = repository.create(match);

        return await repository.save(newMatch);
    }
}

export default new MatchRepository();
