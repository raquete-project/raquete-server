import ILocationRepository from '@domain/location/ILocationRepository';

export default (locationRepository: ILocationRepository) => {
    return locationRepository.findAllLocations();
};
