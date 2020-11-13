/*
Reference: https://www.sqlitetutorial.net/sqlite-nodejs/query/
*/

const sqlite3 = require('sqlite3').verbose();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const math = require('mathjs');

let db = new sqlite3.Database('./data/meterDB.sqlite',sqlite3.OPEN_READWRITE,(err) => { // if fails, use "./project/data/meterDB.sqlite"
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the Meter database.');
});

calculateComputation();
displayProject();
displayMeterReading();

function calculateCompletion() {
    let sql = 'SELECT MeterWO.WO_Num, MeterWO.Department, MeterWO.Goal_Group, MeterWO.Completion, MeterWO.Goal, MeterWO.units FROM MeterWO, Projects WHERE PS_Project = p_PS_Project;';

    
}

function displayProject() {
    let sql = 'SELECT p_PS_Project, p_Description, p_Status FROM Projects, MeterWO';

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
    
        // Print out Project rows
        rows.forEach((row) => {
            console.log(row.p_PS_Project, row.p_Description, row.p_Status);
        });
    });
}

function displayMeterReading() {
    let sql = 'SELECT Meters.m_Meter_Name, Meters.m_Meter_Reading, Meters.m_Reading_Date, Meters.m_Goal_Group, MeterWO.Goal FROM Meters, MeterWO WHERE m_Goal_Group IN (SELECT GOAL_GROUP FROM meterreading_tbl GROUP BY GOAL_GROUP HAVING COUNT(PS_PROJECT) > 1)';

    var totalProgress = 0;
    var totalGoal = 0;
    var completeRate = 0;

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }

        rows.forEach((row) => {
            totalProgress += row.(Meters.m_MeterReading);
        })

    });
}


db.close(() => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Closed Meter database connection.');
});

// Test server
app.listen(8000, function() {
    console.log("server started on port 8000");
  });