const settings = require("./settings"); 

const [firstName,lastName, dateOfBirth] = process.argv.slice(2);

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

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