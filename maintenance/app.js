//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require('sqlite3').verbose();
//your created modules:
const calculateTrend = require(__dirname + "/calculateTrend.js");
const app= express();
const math = require('mathjs');


var fromInput="";
var toInput="";
app.set('view engine', 'ejs');//tell our app to use ejs as its view engine
//to get date from browser: filter by dates:use bodyparser
app.use(bodyParser.urlencoded({extended:true}));

// open the database
let db = new sqlite3.Database('./data/workorderDB.sqlite',sqlite3.OPEN_READWRITE,(err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the WO database.');
  });

//test aproximated hrs
//let aprox = calculateTrend.calculateAproxHours("SWITCH MACH","PM","TC");
//console.log(aprox);

calculateAproxHours();
displayWOinfo();

// use public folder with css and images 
app.use(express.static("public"))
let description ="";
let start_Date ="";
let end_Date = "";

// bottom tabs 

let loc_desc = "";
let brt_dept = "";
let aprox_hrs = "";

// main tabs 

let work_order_number ="";
let work_type = "";
let asset_type = "";
let reported_date = "";
let location = "";
let stat ="";

app.get("/", (req, res) => {
  if(fromInput == "" && toInput == ""){
    const sql = "SELECT wonum,work_type, asset_type,s_reportdate,l_location,s_status FROM workorders,status,location WHERE wonum=s_wonum AND wonum=l_wonum ORDER BY s_FORMATreportdate"
    db.all(sql, [], (err, rows) => {
      if (err) {
      return console.error(err.message);
      }
      res.render("list", {model: rows});//list under views and pass mode=variable
    });
}
else{
  const sql = "SELECT wonum,work_type, asset_type,s_reportdate,l_location,s_status FROM workorders,status,location WHERE wonum=s_wonum AND wonum=l_wonum AND s_FORMATreportdate BETWEEN '"+fromInput+ "' AND '"+toInput+"' ORDER BY s_FORMATreportdate"
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.render("list", {model: rows});//list under views and pass mode=variable
  });
}
});


//handle the post request for filtering by range
//html elements: from_date,to_date
app.post("/",function(req,res){
  fromInput= req.body.from_date;
  toInput= req.body.to_date;
  console.log(fromInput);
  console.log(toInput);
  res.redirect("/");
});



function calculateAproxHours() {
  //inputType,inputwork,inputDept
  var inputType=input.type;
  var inputwork=input.work;
  var inputDept=input.dep;

  let list_of_hrs=[];
  let result=0;
  const sql = "SELECT labor_hours FROM asset_trends WHERE type='"+inputType+"' AND work='"+inputwork+"' AND department='"+inputDept+"' AND labor_hours IS NOT NULL"
  
  db.all(sql, [], (err, rows) => {
    if (err) {
    return console.error(err.message);
    }
    //put in array
    for (const item of rows) {
        list_of_hrs.push(item.labor_hours);
        } 
        result =math.std(list_of_hrs);
        console.log(result);
  }); 
}
function displayWOinfo() {
  //inputWO
  var inputWO=input.type;
  let list_of_hrs=[];
  let result=0;
  const sql = "SELECT wonum,description,s_startdate,s_finishdate,department,l_description FROM workorders, status, location WHERE wonum=s_wonum AND wonum=l_wonum AND wonum='"+inputWO+"';"
  db.get(sql, [], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
  });
}

app.listen(3000, function(){//our server
    console.log("server started on port 3000");//print on console
});