import IPairRepository from '@domain/pair/IPairRepository';

export default (pairRepository: IPairRepository, pairId: string) => {
    return pairRepository.deletePair(pairId);
};
