import Match from './Match';

export default interface ILocationRepository {
    findAllMatches(): Promise<any>;
    createMatch(match: Match): Promise<any>;
}
