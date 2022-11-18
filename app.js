var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var http = require('http');
var path = require("path");
var bodyParser = require('body-parser');
var helmet = require('helmet');
var rateLimit = require("express-rate-limit");
// const {Student} = require('./main.js');
// const puppeteer = require('puppeteer');


// const {step1Data} = require('./main.js');
// import { Step1data } from './main';
// var step1 = require('Step1data')

var app = express();
var server = http.createServer(app);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});


var db = new sqlite3.Database('./database/test.db');


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'.')));
app.use(helmet());
app.use(limiter);


db.run('CREATE TABLE IF NOT EXISTS survey(question TEXT, answer TEXT)');


app.get('/', function(req,res){
  res.sendFile(path.join(__dirname,'./index.html'));
});


// Insert
// app.post('/add', function(req,res){
//   db.serialize(()=>{
//     db.run('INSERT INTO survey(question,answer) VALUES(?,?)', ["Q3", req.body.step3answer ], function(err) {
//       if (err) {
//         return console.log(err.message);
//       }
//       console.log("Value updated");
//       res.send("Question/Answer Updated = "+req.body.id+ " and Name = "+req.body.name);
//     });
// });
// });

app.post('/add', function(req,res){
  db.serialize(()=>{

    // db.run('INSERT INTO survey(question,answer) VALUES(?,?)', [D.querySelector("#coords > span").innerHTML, req.body.step2answer ]);
    db.run('INSERT INTO survey(question,answer) VALUES(?,?)', ["What do you prioritize in variety selection?", req.body.step2answer ]);
    db.run('INSERT INTO survey(question,answer) VALUES(?,?)', ["On average, how severe is the disease threat? ", req.body.step3answer ]);
    db.run('INSERT INTO survey(question,answer) VALUES(?,?)', ["On average, how severe are threats posed by thrips?", req.body.step4answer ]);
    db.run('INSERT INTO survey(question,answer) VALUES(?,?)', ["On average, how severe are threats posed by cotton fleahoppers?", req.body.step5answer ]);
    console.log("Value updated");
});
});





// // View
// app.post('/view', function(req,res){
//   db.serialize(()=>{
//     db.each('SELECT id ID, name NAME FROM emp WHERE id =?', [req.body.id], function(err,row){     //db.each() is only one which is funtioning while reading data from the DB
//       if(err){
//         res.send("Error encountered while displaying");
//         return console.error(err.message);
//       }
//       res.send(` ID: ${row.ID},    Name: ${row.NAME}`);
//       console.log("Entry displayed successfully");
//     });
//   });
// });



// //UPDATE
// app.post('/update', function(req,res){
//   db.serialize(()=>{
//     db.run('UPDATE emp SET name = ? WHERE id = ?', [req.body.name,req.body.id], function(err){
//       if(err){
//         res.send("Error encountered while updating");
//         return console.error(err.message);
//       }
//       res.send("Entry updated successfully");
//       console.log("Entry updated successfully");
//     });
//   });
// });



// //DELETE
// app.post('/delete', function(req,res){
//   db.serialize(()=>{
//     db.run('DELETE FROM emp WHERE id = ?', req.body.id, function(err) {
//       if (err) {
//         res.send("Error encountered while deleting");
//         return console.error(err.message);
//       }
//       res.send("Entry deleted");
//       console.log("Entry deleted");
//     });
//   });
// });




app.get('/close', function(req,res){
  db.close((err) => {
    if (err) {
      res.send('There is some error in closing the database');
      return console.error(err.message);
    }
    console.log('Closing the database connection.');
    res.send('Database connection successfully closed');
  });
});




server.listen(3000,function(){ 
  console.log("Server listening on port: 3000");
})