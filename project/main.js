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

let db = new sqlite3.Database('./data/meterDB.sqlite' ,sqlite3.OPEN_READWRITE,(err) => { // if fails, use "./project/data/meterDB.sqlite"
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the Meter database.');
});

// calculateComputation();
// displayProject();
// displayMeterReading();

// FIXME: Need to display the respective meters within each project
// Display all projects from the database
// app.get('/projecttest', (req, res, next) => {
//     let sql = `SELECT p_PS_Project, p_Project_Desc, p_Status
//                 FROM Projects
//                 GROUP BY p_PS_Project`;

//     db.all(sql, [], (err, rows) => {
//         if (err) {
//             throw err;
//         }
//         else
//         {
//             // Print out Project rows on the console
//             rows.forEach((row) => {
//                 console.log(row.p_PS_Project, row.p_Description, row.p_Status);
//             });

//             // res.json({"Message":"Success",
//             //             "Data":rows});

//             res.render("projecttest", {rows: rows});
//         }
//     });
// });


// FIXME: How do I display the meters in the same page as the projects?
// Display the meter info from each project (Must display in the same project)
// Make sure meter readings are picked by the same Project ID and Goal Group
// Suggestion: use a 2D for-loop

// FIXME: The meter readings need to be displayed under each respective project
app.get('/metertest', (req, res, next) => {
    let sql = `SELECT p_PS_Project, p_Project_Desc, p_Status,
                MeterWO.WO_Num, MeterWO.Department, MeterWO.Goal_Group, MeterWO.Completion, MeterWO.Goal, MeterWO.units
                FROM Projects, MeterWO
                WHERE
                    PS_Project = p_PS_Project
                GROUP BY p_PS_Project`;
    var proj = [];
    var meter = [];

    db.serialize(() => {
        db.each(sql, (err, row) => {
            if (err)
            {
                throw err;
            }
            else
            {
                console.log(row.p_PS_Project, row.p_Project_Desc, row.p_Status);
                console.log(row.WO_Num, row.Department, row.Goal_Group, row.Completion, row.Goal, row.units);
                
                proj.push({PS_Proj: row.p_PS_Project, Proj_Desc: row.p_Project_Desc, Status: row.p_Status, WorkOrder: row.WO_Num, Dept: row.Department, GoalGroup: row.Goal_Group, Completion: row.Completion, Goal: row.Goal, Units: row.units});

                let sqlMeter = `SELECT m_Meter_Name, m_Meter_Reading, m_Reading_Date
                            FROM Meters
                            INNER JOIN MeterWO on m_Goal_Group = Goal_Group
                            WHERE
                                m_Goal_Group = '${row.Goal_Group}'
                            ORDER BY m_Reading_Date DESC,
                                    m_Meter_Reading DESC`;
                db.serialize(function() {
                    db.each(sqlMeter, (err, row2) => {
                        if (err)
                        {
                            throw err;
                        }
                        else
                        {
                            console.log(row2.m_Meter_Name, row2.m_Meter_Reading, row2.m_Reading_Date);
                            meter.push({Meter_Name: row2.m_Meter_Name, Meter_Reading: row2.m_Meter_Reading, Reading_Date: row2.m_Reading_Date});
                        }
                    }, function() {
                        res.render("metertest", {rows: proj, rows2: meter});
                    });
                });
            }
        });
    });
});

// const getMeterReadings = async (item) => {
//     const goalGroup = item;
//     let sql = `SELECT m_Meter_Name, m_Meter_Reading, m_Reading_Date
//             FROM Meters
//             INNER JOIN MeterWO on m_Goal_Group = Goal_Group
//             WHERE
//                 m_Goal_Group = ${goalGroup}
//             ORDER BY m_Reading_Date DESC`;
//     db.all(sql, [], (err, rows) =>
//     {

//     });
    
// };

app.get('/metertest4', (req, res, next) => {
    let sql = `SELECT p_PS_Project, p_Project_Desc, p_Status,
                MeterWO.WO_Num, MeterWO.Department, MeterWO.Goal_Group, MeterWO.Completion, MeterWO.Goal, MeterWO.units
                FROM Projects, MeterWO
                WHERE
                    PS_Project = p_PS_Project
                GROUP BY p_PS_Project`;

    db.all(sql, [], (err, rows) => {
        if (err)
        {
            throw err;
        }
        else
        {
            rows.forEach((row) => {
                console.log(row.p_PS_Project, row.p_Project_Desc, row.p_Status);
                console.log(row.WO_Num, row.Department, row.Goal_Group, row.Completion, row.Goal, row.units);

                let sqlMeter = `SELECT m_Meter_Name, m_Meter_Reading, m_Reading_Date
                            FROM Meters
                            INNER JOIN MeterWO on m_Goal_Group = Goal_Group
                            WHERE
                                m_Goal_Group = '${row.Goal_Group}'
                            ORDER BY m_Reading_Date DESC,
                                    m_Meter_Reading DESC`;
            
                db.all(sqlMeter, [], (err, rows2) => {
                    if (err)
                    {
                        throw err;
                    }
                    else
                    {
                        rows2.forEach((row2) => {
                            console.log(row2.m_Meter_Name, row2.m_Meter_Reading, row2.m_Reading_Date);
                        });

                        res.render("metertest", {rows: rows, rows2: rows2});
                    }
                });
            });
        }
    });
});


// Only proper working app.get function (almost)
app.get('/metertest5', (req, res, next) => {
    let sqlProj = `SELECT p_PS_Project, p_Project_Desc, p_Status,
                MeterWO.WO_Num, MeterWO.Department, MeterWO.Goal_Group, MeterWO.Completion, MeterWO.Goal, MeterWO.units
                FROM Projects, MeterWO
                WHERE
                    PS_Project = p_PS_Project
                GROUP BY p_PS_Project`;

    async.series([
        function(callback) {
            db.all(sqlProj, callback)
        },
        function(callback) {
            let sqlMeter = `SELECT m_Meter_Name, m_Meter_Reading, m_Reading_Date
                FROM Meters
                INNER JOIN MeterWO on m_Goal_Group = Goal_Group
                WHERE
                    m_Goal_Group = Goal_Group
                ORDER BY m_Reading_Date DESC,
                        m_Meter_Reading DESC`;
            db.all(sqlMeter, callback)
        }
    ], function(err, rows) {
        if (err)
        {
            throw err;
        }
        else
        {
            res.render("metertest", {rows: rows[0], rows2: rows[1]});
        }
    });
});

function getProjects(sqlProj, callback) {
    db.all(sqlProj, [], (err, rows) => {
        if (err)
        {
            throw err;
        }
        else
        {
            callback(rows);
        }
    });
}

function getMeterReadings(sqlMeter, goalGroup, callback) {
    db.all(sqlMeter, [goalGroup], (err, rows) => {
        if (err)
        {
            throw err;
        }
        else
        {
            callback(rows);
        }
    });
}

app.get('/metertest6', (req, res, next) => {
    let sqlProj = `SELECT p_PS_Project, p_Project_Desc, p_Status,
                MeterWO.WO_Num, MeterWO.Department, MeterWO.Goal_Group, MeterWO.Completion, MeterWO.Goal, MeterWO.units
                FROM Projects, MeterWO
                WHERE
                    PS_Project = p_PS_Project
                GROUP BY p_PS_Project`;

    getProjects(sqlProj, (err, rows) => {
        if (err)
        {
            throw err;
        }
        else
        {
            rows.forEach((row) => {
                let sqlMeter = `SELECT m_Meter_Name, m_Meter_Reading, m_Reading_Date
                                FROM Meters
                                INNER JOIN MeterWO on m_Goal_Group = Goal_Group
                                WHERE
                                    m_Goal_Group = ?
                                ORDER BY m_Reading_Date DESC,
                                        m_Meter_Reading DESC`;
                getMeterReadings(sqlMeter, row.Goal_Group, (err, rows2) => {
                    if (err)
                    {
                        throw err;
                    }
                    else
                    {
                        res.render("metertest", {rows: rows, rows2: rows2});
                    }
                });
            });
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
app.listen(8000, function() {
    console.log("Server started on port 8000");
  });
