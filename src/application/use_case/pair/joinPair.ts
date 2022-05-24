import IPairRepository from '@domain/pair/IPairRepository';

export default (
    pairRepository: IPairRepository,
    pairId: string,
    userId: string
) => {
    return pairRepository.joinPair(pairId, userId);
};
