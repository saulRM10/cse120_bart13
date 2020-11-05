//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require('sqlite3').verbose();
//your created modules:
const calculateTrend = require(__dirname + "/calculateTrend.js");
const app= express();
const math = require('mathjs');

/*
var fromInput="";
var toInput="";
app.set('view engine', 'ejs');//tell our app to use ejs as its view engine
//to get date from browser: filter by dates:use bodyparser
app.use(bodyParser.urlencoded({extended:true}));
*/

// open the database
let db = new sqlite3.Database('./data/meterDB.sqlite',sqlite3.OPEN_READWRITE,(err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the Meter database.');
  });

calc_OverallCompletionRate();
displayMeters();
displayMeterInfo();
displayActivity();

app.get("/", (req, res) => {
    const sql = "SELECT WO_Num, Department, Goal_Group, Goal, Units, m_Meter_Name, m_Meter_Reading, m_Reading_Date, Completion FROM MeterWO, Meters, Project WHERE m_Goal_Group = Goal_Group AND PS_Project = p_PS_Project ORDER BY m_Reading_Date"
    db.all(sql, [], (err, rows) => {
      if (err) {
        return console.error(err.message);
      }
      res.render("list", {model: rows});//list under views and pass mode=variable
    });
});

function calc_OverallCompletionRate() {
  let totalProgress = 0;
  let totalGoal = 0;
  let completionRate = 0;

  // Select meter readings from the same goal group
  const sql = "SELECT m_Meter_Reading, Goal FROM Meters WHERE m_Goal_Group = 'A1 DRAIN,A1 DRAIN 2' AND m_Completion IS NULL"
  db.all(sql, [], rows => {

    for (const item of rows) {
      (item.Completion).push(math.round((item.m_Meter_Reading / item.Goal) * 100));

      totalProgress += item.m_Meter_Reading;
      totalGoal += item.Goal;

      // console.log(item.Completion) // DEBUG: view completion rate
    }

    completionRate = math.round((totalProgress/totalgoal) * 100); // Round completion by percentage

    console.log(totalProgress);
    console.log(totalGoal);
    console.log(completionRate);
  });
}

function displayMeters() {
  const sql = "SELECT p_PS_Project, p_Description, Status FROM Projects, MeterWO WHERE p_PS_Project = PS_Project"
  db.get(sql, [], row => {
    console.log(row.p_PS_Project);
    console.log(row.p_Description);
    console.log(row.Status);
  });
}

// The specific info must be displayed for the meter that is clicked on
function displayMeterInfo() {
  const sql = "SELECT WO_Num, Department, Goal_Group, Goal, Units, m_Meter_Name, m_Meter_Reading, m_Reading_Date, Completion FROM MeterWO, Meters, Project WHERE m_Goal_Group = Goal_Group AND PS_Project = p_PS_Project"
  db.get(sql, [], row => {
    console.log(row.WO_Num);
    console.log(row.Department);
    console.log(row.Goal_Group);
    console.log(row.Goal);
    console.log(row.Units);
    console.log(row.m_Meter_Name);
    console.log(row.m_Meter_Reading);
    console.log(row.m_Reading_Date);
    console.log(row.Completion);
  });
}

app.listen(3000, function(){//our server
  console.log("server started on port 3000");//print on console
});