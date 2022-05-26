import { createConnection } from 'typeorm';
import User from '@domain/user/User';
import Pair from '@domain/pair/Pair';
import Location from '@domain/location/Location';

createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [User, Pair, Location],
}).then(() => {
    console.log('Successfully connected with database');
});
