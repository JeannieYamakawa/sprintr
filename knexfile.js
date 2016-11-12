// Update with your config settings.

module.exports = {

    development: {
        client: 'pg',
        connection: {
            host: 'localhost',
            database: 'chrome_tracker_dev'
        },
        migrations: {
            directory: __dirname + '/src/server/db/migrations'
        },
        seeds: {
            directory: __dirname + '/src/server/db/seeds/dev'
        }
    },

    test: {
        client: 'pg',
        connection: {
            host: 'localhost',
            database: 'chrome_tracker_test'
        },
        migrations: {
            directory: __dirname + '/src/server/db/migrations'
        },
        seeds: {
            directory: __dirname + '/src/server/db/seeds/dev'
        }
    },

    production: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }

};
