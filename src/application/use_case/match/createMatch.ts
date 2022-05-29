import IMatchRepository from '@domain/match/IMatchRepository';
import Match from '@domain/match/Match';

export default (
    matchRepository: IMatchRepository,
    date: Date,
    result: string,
    pairId1: string,
    pairId2: string,
    locationId: string,
    matchId?: string
) => {
    const match = new Match(
        date,
        result,
        pairId1,
        pairId2,
        locationId,
        matchId
    );
    return matchRepository.createMatch(match);
};
