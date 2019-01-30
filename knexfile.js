// Update with your config settings.

const connection = require('./settings.json');

module.exports = {

  development: {
    client: 'postgresql',
    connection: connection,
    // pool: {
    //   min: 2,
    //   max: 10
    // },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
