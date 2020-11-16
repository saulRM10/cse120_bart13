/*
References:
    https://www.sqlitetutorial.net/sqlite-nodejs/query/
    https://developerhowto.com/2018/12/29/build-a-rest-api-with-node-js-and-express-js/
*/

const sqlite3 = require('sqlite3').verbose();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const path = require('path');
// const dbPath = path.resolve(__dirname, 'meterDB.sqlite');
// const math = require('mathjs');

// Set view engine to ejs

app.set('view engine', 'ejs');

let db = new sqlite3.Database('./data/meterDB.sqlite' ,sqlite3.OPEN_READWRITE,(err) => { // if fails, use "./project/data/meterDB.sqlite"
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the Meter database.');
});

// calculateComputation();
// displayProject();
// displayMeterReading();

// Display all projects from the database
app.get('/projecttest', (req, res, next) => {
    let sql = `SELECT p_PS_Project, p_Description, p_Status
                FROM Projects, MeterWO`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
    
        // Print out Project rows on the console
        // rows.forEach((row) => {
        //     console.log(row.p_PS_Project, row.p_Description, row.p_Status);
        // });

        res.json({"Message":"Success",
                    "Data":rows})
    }); 
});

// Display the meter info from each project
app.get('/metertest', (req, res, next) => {
    let sql = `SELECT Meters.m_Meter_Name, Meters.m_Meter_Reading, Meters.m_Reading_Date, Meters.m_Goal_Group, MeterWO.Goal 
                FROM Meters, MeterWO
                WHERE m_Goal_Group IN (
                        SELECT GOAL_GROUP
                        FROM meterreading_tbl
                        GROUP BY GOAL_GROUP
                        HAVING COUNT(PS_PROJECT) > 1
                    )`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }

        res.json({"Message":"Success",
                    "Data":rows})
    }); 
});

// function calculateCompletion() {
//     let sql = `SELECT Meters.m_Meter_Name, Meters.m_Meter_Reading, Meters.m_Reading_Date, Meters.m_Goal_Group, MeterWO.Goal FROM Meters, MeterWO WHERE m_Goal_Group IN (SELECT GOAL_GROUP FROM meterreading_tbl GROUP BY GOAL_GROUP HAVING COUNT(PS_PROJECT) > 1)`;

//     var totalProgress = 0;
//     var totalGoal = 0;
//     var completeRate = 0;

//     db.all(sql, [], (err, rows) => {
//         if (err) {
//             throw err;
//         }

//         rows.forEach((row) => {
//             totalProgress += row.(Meters.m_MeterReading);
//         });

//     });
// }

// function displayProject() {
//     let sql = `SELECT p_PS_Project, p_Description, p_Status
//                 FROM Projects, MeterWO`;

//     db.all(sql, [], (err, rows) => {
//         if (err) {
//             throw err;
//         }
    
//         // Print out Project rows
//         rows.forEach((row) => {
//             console.log(row.p_PS_Project, row.p_Description, row.p_Status);
//         });
//     });
// }

// function displayMeterReading() {
//     let sql = `SELECT WO_Num, Department, Goal_Group, Goal, Units, m_Meter_Name, m_Meter_Reading, m_Reading_Date, Completion
//     FROM MeterWO, Meters, Projects
//     WHERE m_Goal_Group = Goal_Group AND PS_Project = p_PS_Project`;
//     db.all(sql, [], (err, rows) => {
//         if (err) {
//             throw err;
//         }

//         rows.forEach((row) => {
//             console.log(row.WO_Num, row.Department, row.Goal_Group, row.Goal, row.Units, row.m_Meter_Name, row.m_Reading_Date, row.Completion);
//         });
//     });
// }

// app.get('/test', (req, res) => {
//     res.render('views/test');
// });

// db.close(() => {
//     if (err) {
//         return console.error(err.message);
//     }
//     console.log('Closed Meter database connection.');
// });

// Test server
app.listen(8000, function() {
    console.log("Server started on port 8000");
  });