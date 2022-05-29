import Pair from './Pair';

export default interface IPairRepository {
    findAllPairs(): Promise<any>;
    createPair(pair: Pair): Promise<any>;
    joinPair(pairId: string, userId: string): Promise<any>;
    deletePair(pairId: string): Promise<any>;
}
