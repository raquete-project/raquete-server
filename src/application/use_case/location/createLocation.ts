import ILocationRepository from '@domain/location/ILocationRepository';
import Location from '@domain/location/Location';

export default (
    locationRepository: ILocationRepository,
    address: string,
    locationId?: string
) => {
    const location = new Location(address, locationId);
    return locationRepository.createLocation(location);
};
