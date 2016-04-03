var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  port: 3306,
  user     : 'root',
  password : 'root08',
  database : 'EMR'
});

exports.getResults = function(query,key){
  connection.connect(function(err){
    if(err){
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');
  });
  var result = '';
  connection.query(query,[key], function(err, rows, fields) {
    if (!err){

      result = rows;
      //console.log('The solution is: ', result[0]);
    }else
      console.log(err);
  });

  connection.end();
  //console.log('The solution is: ', result[0]);
  return result;
}
