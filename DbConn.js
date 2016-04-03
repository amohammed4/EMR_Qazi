var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  port: 3306,
  user     : 'root',
  password : 'root08',
  database : 'EMR'
});

connection.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

connection.query('SELECT * from Allergies;', function(err, rows, fields) {
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log(err);
});

connection.end();
