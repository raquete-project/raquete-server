import Location from './Location';

export default interface ILocationRepository {
    findAllLocations(): Promise<any>;
    createLocation(location: Location): Promise<any>;
}
