import { createConnection } from 'typeorm';
import User from '@domain/user/User';
import Pair from '@domain/pair/Pair';

createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [User, Pair],
}).then(() => {
    console.log('Successfully connected with database');
});
