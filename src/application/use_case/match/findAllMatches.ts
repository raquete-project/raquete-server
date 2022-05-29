import IMatchRepository from '@domain/match/IMatchRepository';

export default (matchRepository: IMatchRepository) => {
    return matchRepository.findAllMatches();
};
