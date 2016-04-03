var express = require('express');
var databaseResults = require('./lib/connection.js')
var app = express();
var handlebars = require('express3-handlebars').create({ defaultLayout: 'main' ,helpers: {section: function(name, options){ if(!this._sections) this._sections = {}; this._sections[name] = options.fn(this); return null;} }});
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  port: 3306,
  user     : 'root',
  password : 'W1251990w',
  database : 'EMR'
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(require('body-parser')());
app.use("/css", express.static(__dirname + '/css'));
app.use("/physician/css", express.static(__dirname + '/physician/css'));
app.use("/physician/js", express.static(__dirname + '/physician/js'));
app.use("/physician/tab-content", express.static(__dirname + '/physician/tab-content'));


app.post('/say_hello', function (req, res) {
  console.log(req.body.username+" "+req.body.password+" "+req.body.loginas )
  /*var pass = databaseResults.getResults('SELECT password FROM '+req.body.loginas+' WHERE username=?',req.body.username);
  console.log(pass);*/
  //var patientByPhysician = databaseResults.getResults('CALL findPatientsByPhysicianId("?")',55555);
  //console.log("OUTSIDE ",databaseResults.getResults('CALL findPatientsByPhysicianId("?")',55555));
  //var data = { RowDataPacket: [{SSN: '99999',First_Name: 'John',Last_Name: 'Smith',Birth_Date: 'Fri Jul 09 1965 00:00:00 GMT-0400 (EDT)',Gender: 'M',Current_Status: 'Heart Problem' }]};

  connection.connect(function(err){
    if(err){
      console.log('Error connecting to Db');
      return;
          }
    console.log('Connection established');
    });
  connection.query('SELECT person.SSN,'+
                    		'person.First_Name, '+
                    		'person.Last_Name, '+
                    		'person.Birth_Date, '+
                    		'person.Gender, '+
                    		'patient.Current_Status '+
                    	'FROM Person person, Patient patient '+
                    	'WHERE patient.D_SSN =? AND patient.SSN = person.SSN',[55555], function(err, rows, fields) {
    if (!err){
      console.log('1 ',rows);
      res.render('patient-table',{result: rows});
      //console.log('2 ',rows[0][0].SSN);
    }else
      console.log(err);
    });

  //connection.end();

})

app.get('/patient-details',function(req,res){

    var demog_query = 'SELECT First_Name, Last_Name, Gender, Birth_Date, SSN, Home_Address, City, State, ZipCode, Home_Phone FROM Person WHERE SSN = ?'
    var pre_query = 'SELECT patient.EntryDate, pre.Value FROM PreExistingConditions pre, PatientsPreConditions patient WHERE patient.P_SSN = ? AND pre.Id = patient.PreConditionId ORDER BY patient.EntryDate DESC';
  connection.query(demog_query,[req.query.ssn], function(err, rows, fields) {
    if (!err){
      console.log('1 ',rows[0]);
      res.render('patient-demographics',{layout:'patient-info' ,result:rows[0]});
     console.log('2 ',rows[0].First_Name);
    }else
      console.log(err);
    });
    /*connection.query(pre_query,[req.query.ssn], function(err, rows, fields) {
      if (!err){
        console.log('1 ',rows[0]);
        res.render('patient-preconditions',{layout:null ,result:rows[0]});
       //console.log('2 ',rows[0].Value);
      }else
        console.log(err);
      });*/

  //connection.end();

})

app.get('/patient-pre-conditions',function(req,res){

    var pre_query = 'SELECT patient.EntryDate, pre.Value FROM PreExistingConditions pre, PatientsPreConditions patient WHERE patient.P_SSN = ? AND pre.Id = patient.PreConditionId ORDER BY patient.EntryDate DESC';

    connection.query(pre_query,[req.query.ssn], function(err, rows, fields) {
      if (!err){
        console.log('1 ',rows[0]);
        res.render('patient-preconditions',{layout:null ,result:rows[0]});
       console.log('2 ',rows[0].Value);
      }else
        console.log(err);
      });

  connection.end();

})

app.get('/login.html',function(req, res){
  res.sendFile( __dirname + "/" + "login.html" );
})

var server = app.listen(8082, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
