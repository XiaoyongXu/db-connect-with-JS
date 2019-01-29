const settings = require("./settings"); 
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

const data = process.argv.slice(2)[0];

console.log('searching...');
knex('famous_people')
  .where('first_name',data)
  .orWhere('last_name',data)
  .asCallback(function(err, rows) {
    if (err){
      console.log(err);
    }
    if (rows){
      console.log(`FOUND ${rows.length} person(s) by the name ${data}:`)
      rows.forEach((element,index) => {
        const birthDay = new Date(element.birthdate);
        console.log(`-${index+1}: ${element.first_name} ${element.last_name}, born '${birthDay.getFullYear()}-${(birthDay.getMonth()+1).toString().padStart(2,'0')}-${birthDay.getDate().toString().padStart(2,'0')}'`);
      });
    }
  }).finally(function() {
    knex.destroy();
  })
