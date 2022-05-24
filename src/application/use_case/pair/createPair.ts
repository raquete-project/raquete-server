import Pair from '@domain/pair/Pair';
import IPairRepository from '@domain/pair/IPairRepository';

export default (
    pairRepository: IPairRepository,
    name: string,
    userId1?: string,
    userId2?: string
) => {
    const pair = new Pair(name, userId1, userId2);
    return pairRepository.createPair(pair);
};
