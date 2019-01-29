const pg = require('pg');

const data = process.argv.slice(2);

const settings = require("./settings"); 

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  function findFamousPeople(client,data){
    const query = "SELECT first_name,last_name,birthdate FROM famous_people WHERE famous_people.first_name=$1 OR famous_people.last_name=$1 ";
    const values = data;
    console.log('Searching...');
    
    doQuery(client,query,values,(element,index) => {
      const birthDay = new Date(element.birthdate);
      console.log(`-${index +1}: ${element.first_name} ${element.last_name}, born '${birthDay.getFullYear()}-${(birthDay.getMonth()+1).toString().padStart(2,'0')}-${birthDay.getDate().toString().padStart(2,'0')}'`)
    });
  }

  function doQuery(client, query, values, cb) {
    client.query(query, values, (err, res) => {
      if (err) {
        console.log(err);
        return false;
      }
      if (res.rows.length) {
        console.log(`FOUND ${res.rows.length} person(s) by the name ${values}:`);
        res.rows.forEach(cb);
      } else {
        console.log("No results found");
      }
      client.end();
    });
  }

  if (err) {
    return console.error("Connection Error", err);
  }

  findFamousPeople(client,data);

});

