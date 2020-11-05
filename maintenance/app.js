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
  let list_of_hrs=[];
  let result=0;
  //const sql = "SELECT labor_hours FROM asset_trends WHERE type='"+inputType+"' AND work='"+inputwork+"' AND department='"+inputDept+"' AND labor_hours IS NOT NULL"
  const sql ="SELECT labor_hours FROM asset_trends WHERE type= 'SWITCH MACH' AND work='PM' AND department='TC' AND labor_hours IS NOT NULL"
  db.all(sql, [], (err, rows) => {
    if (err) {
    return console.error(err.message);
    }
    //put in array
    for (const item of rows) {
        list_of_hrs.push(item.labor_hours);
        } 
      //if you want to access the data it has to be inside the all() function, 
      //you cant return it either so move this to the app.js page
        /*for (const i of list_of_hrs) {
          console.log(i);
          }
          */
        result =math.std(list_of_hrs);
        console.log(result);
  }); 
}
function displayWOinfo() {
  //inputWO
  let list_of_hrs=[];
  let result=0;
  //const sql = "SELECT wonum,description,s_startdate,s_finishdate,department,l_description FROM workorders, status, location WHERE wonum=s_wonum AND wonum=l_wonum AND wonum='"+inputWO+"';"
  const sql ="SELECT wonum,description, s_startdate,s_finishdate,department,l_description FROM workorders, status, location WHERE wonum=s_wonum AND wonum=l_wonum AND wonum= '15833129';"
  db.get(sql, [], (err, row) => {
    if (err) {
      return console.error(err.message);
    }

      console.log(row.wonum);
      console.log(row.description);
      console.log(row.s_startdate);
      console.log(row.s_finishdate);
      console.log(row.department);
      console.log(row.l_description);
    
     
  });
}

app.listen(3000, function(){//our server
    console.log("server started on port 3000");//print on console
});