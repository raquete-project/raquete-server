import ILocationRepository from '@domain/location/ILocationRepository';
import Location from '@domain/location/Location';
import { getRepository } from 'typeorm';

class LocationRepository implements ILocationRepository {
    async findAllLocations() {
        const repository = getRepository(Location);

        return await repository.find();
    }

    async createLocation(location: Location) {
        const repository = getRepository(Location);
        const existsLocation = await repository.findOne({
            where: { address: location.address },
        });

        if (existsLocation) {
            return {
                status: 'error',
                message: 'Duplicate location',
                payload: null,
            };
        }

        const newLocation = repository.create(location);

        return await repository.save(newLocation);
    }
}

export default new LocationRepository();
