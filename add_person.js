const [firstName,lastName, dateOfBirth] = process.argv.slice(2);

const config = require('./knexfile');
const knex = require('knex')(config);

knex.insert({
  first_name: firstName,
  last_name: lastName,
  birthdate: dateOfBirth
})
.returning('id')
.into('famous_people')
.finally(function() {
  knex.destroy();
})