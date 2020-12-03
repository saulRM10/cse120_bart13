//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require('sqlite3').verbose();
const app= express();
const math = require('mathjs');



app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// open the database
let db = new sqlite3.Database('./data/workorderDB.sqlite',sqlite3.OPEN_READWRITE,(err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the WO database.');
  });


// use public folder with css and images 
app.use(express.static("public"))

app.get("/", function(req, res){
    
    const sql = "SELECT wonum,work_type,department, asset_type,s_reportdate,l_location,s_status FROM workorders,status,location WHERE wonum=s_wonum AND wonum=l_wonum ORDER BY s_FORMATreportdate"
    db.all(sql, [], (err, rows) => {
      if (err) {
      return console.error(err.message);
      }
      res.render("dropDown", {model: rows});//list under views and pass mode=variable
    });
});

app.get("/displayWOinfo", function(req, res){
  const inputWO = req.query.cont;
  const sql = "SELECT wonum,description,s_startdate,s_finishdate,department,l_description FROM workorders, status, location WHERE wonum=s_wonum AND wonum=l_wonum AND wonum='"+inputWO+"';"
  db.get(sql, [], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
      res.send(row);
  });
  //res.send("9");
});

app.get("/displayhours", function(req, res){
 //inputType,inputwork,inputDept
var inputType=req.query.type;
inputType = inputType.trim();
var inputwork=req.query.work;
inputwork = inputwork.trim();
var inputDept=req.query.dep;
inputDept = inputDept.trim();
console.log(inputType);
console.log(inputwork);
console.log(inputDept);
let list_of_hrs=[];
let result=0;
const sql = "SELECT labor_hours FROM asset_trends WHERE type='"+inputType+"' AND work='"+inputwork+"' AND department='"+inputDept+"' AND labor_hours IS NOT NULL;"
db.all(sql, [], (err, rows) => {
   if (err) {
   return console.error(err.message);
   }
   //put in array
   for (const item of rows) {
       list_of_hrs.push(item.labor_hours);
    } 
    if (list_of_hrs.length == 0) {
      console.log("theres no previous data");
    }
    else{
      result =math.std(list_of_hrs);
      console.log(result);
    }
    
 }); 
 res.send("9");

});


app.listen(3000, function(){//our server
    console.log("server started on port 3000");//print on console
});