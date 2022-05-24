import IPairRepository from '@domain/pair/IPairRepository';

export default (
    pairRepository: IPairRepository,
) => {
    return pairRepository.findAllPairs();
};
