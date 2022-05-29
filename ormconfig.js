if (process.env.NODE_ENV === 'development') {
    const User = require('./src/domain/user/User');
    const Pair = require('./src/domain/pair/Pair');
    const Location = require('./src/domain/location/Location');
    const Match = require('./src/domain/match/Match');
    module.exports = {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        logging: true,
        entities: [User, Pair, Location, Match],
        migrations: ['src/infrastructure/db/migrations/**/*.{ts,js}'],
        cli: {
            entitiesDir: 'src/domain',
            migrationsDir: ['src/infrastructure/db/migrations'],
        },
    };
} else {
    const User = require('./dist/domain/user/User');
    const Pair = require('./dist/domain/pair/Pair');
    const Location = require('./dist/domain/location/Location');
    const Match = require('./dist/domain/match/Match');
    module.exports = {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        logging: true,
        ssl: true,
        extra: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
        entities: [User, Pair, Location, Match],
        migrations: ['dist/infrastructure/db/migrations/**/*.{ts,js}'],
        cli: {
            entitiesDir: 'src/domain',
            migrationsDir: ['src/infrastructure/db/migrations'],
        },
    };
}
