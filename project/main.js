/*
References:
    https://www.sqlitetutorial.net/sqlite-nodejs/query/
    https://developerhowto.com/2018/12/29/build-a-rest-api-with-node-js-and-express-js/
    https://ncoughlin.com/posts/express-ejs-render-page-dynamic-content/
*/

const sqlite3 = require('sqlite3').verbose();
const express = require("express");
const bodyParser = require("body-parser");
const async = require('async');

const app = express();
const path = require('path');
const { response } = require('express');
// const dbPath = path.resolve(__dirname, 'meterDB.sqlite');
// const math = require('mathjs');

// Set view engine to ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

let db = new sqlite3.Database('./data/meterDB.sqlite' ,sqlite3.OPEN_READWRITE,(err) => { // if fails, use "./project/data/meterDB.sqlite"
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the Meter database.');
});

// Use assets in public folder
app.use(express.static("public"));

// calculateComputation();
// displayProject();
// displayMeterReading();

// Display projects
app.get('/projectview', (req, res, next) => {
    let sql = `SELECT p_PS_Project, p_Project_Desc, p_Status
                FROM Projects
                GROUP BY p_PS_Project`;

    db.all(sql, [], (err, rows) => {
        if (err)
        {
            throw err;
        }
        else
        {
            // Print out Project rows on the console
            rows.forEach((row) => {
                console.log(row.p_PS_Project, row.p_Description, row.p_Status);
            });

            // Does the ejs here need to be renamed?
            res.render("dropDown", {model: rows});
        }
    }); 
});

// Display respective work orders for each project
app.get('/displayProjWO', (req, res, next) => {
    const projInput = req.query.cont;
    const sql = `SELECT
                    MeterWO.WO_Num, MeterWO.Department, MeterWO.Goal_Group, MeterWO.Completion, MeterWO.Goal, MeterWO.units
                    FROM Projects, MeterWO
                    WHERE
                        PS_Project = p_PS_Project
                        AND PS_Project = ${projInput}`;
    db.get(sql, [], (err, row) => {
        if (err)
        {
            throw err;
        }
        else
        {
            // Sends to main.js
            res.send(row);
        }
    });
});

// Display meter readings under the respective goal group
app.get('/displayMeterReading', (req, res, next) => {
    const goalGroup = req.query.cont;
    const sql = `SELECT m_Meter_Name, m_Meter_Reading, m_Reading_Date
                FROM Meters, MeterWO
                WHERE
                    m_Goal_Group = '${goalGroup}'
                    ORDER BY m_Reading_Date DESC,
                            m_Meter_Reading DESC`;

    db.all(sql, [], (err, rows) => {
        if (err)
        {
            throw err;
        }
        else
        {
            // Sends to main.js
            res.send(rows);
        }
    });
});


// function calculateCompletion() {
//     let sql = `SELECT Meters.m_Meter_Name,
//                 Meters.m_Meter_Reading,
//                 MeterWO.Goal
//                 FROM Meters, MeterWO
//                 WHERE m_Goal_Group IN (SELECT GOAL_GROUP FROM meterreading_tbl GROUP BY GOAL_GROUP HAVING COUNT(PS_PROJECT) > 1)`;

//     var totalProgress = 0;
//     var totalGoal = 0;
//     var completeRate = 0;

//     db.all(sql, [], (err, rows) => {
//         if (err) {
//             throw err;
//         }

//         rows.forEach((row) => {
//             totalProgress += row.m_MeterReading;
            
//         });

//     });

//     return completeRate;
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
app.listen(3000, function() {
    console.log("Server started on port 3000")
});
