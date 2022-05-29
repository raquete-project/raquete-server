import IMatchRepository from '@domain/match/IMatchRepository';
import Match from '@domain/match/Match';

export default (
    matchRepository: IMatchRepository,
    date: Date,
    result: string,
    pair1: string,
    pair2: string,
    locationId: string,
    matchId?: string
) => {
    const match = new Match(date, result, pair1, pair2, locationId, matchId);
    return matchRepository.createMatch(match);
};
