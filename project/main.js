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

    // db.exec('PRAGMA foreign_keys = ON;', (err) => {
    //     if (err){
    //         console.error("Foreign Key Enforcement is DISABLED.")
    //     } else {
    //         console.log("Foreign Key Enforcement is ENABLED.")
    //     }
    // });
});

// calculateComputation();
// displayProject();
// displayMeterReading();


function search_project() { 
    let input = document.getElementById('searchbar').value 
    input=input.toLowerCase(); 
    let x = document.getElementsByClassName('project'); 
      
    for (i = 0; i < x.length; i++) {  
        if (!x[i].innerHTML.toLowerCase().includes(input)) { 
            x[i].style.display="none"; 
        } 
        else { 
            x[i].style.display="list-item";                  
        } 
    } 
}

function getProjects(sqlProj, callback) {
    db.all(sqlProj, [], (err, rows2) => {
        if (err)
        {
            throw err;
        }
        else
        {
            callback(rows2);
        }
    });
}

function getMeterReadings(goalGroup, callback) {
    db.all(`SELECT m_Meter_Name, m_Meter_Reading, m_Reading_Date FROM Meters INNER JOIN MeterWO on m_Goal_Group = Goal_Group WHERE m_Goal_Group = '${goalGroup}' ORDER BY m_Reading_Date DESC, m_Meter_Reading DESC`, [goalGroup], (err, rows) => {
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


// FIXME: How do I display the meters in the same page as the projects?
// Display the meter info from each project (Must display in the same project)
// Make sure meter readings are picked by the same Project ID and Goal Group
// Suggestion: use a 2D for-loop
app.get('/metertest', (req, res, next) => {
    let sql = `SELECT p_PS_Project, p_Project_Desc, p_Status,
                MeterWO.WO_Num, MeterWO.Department, MeterWO.Goal_Group, MeterWO.Completion, MeterWO.Goal, MeterWO.units,
                m_Meter_Name, m_Meter_Reading, m_Reading_Date
                FROM Projects, MeterWO, Meters
                WHERE
                    PS_Project = p_PS_Project
                    AND m_Goal_Group = Goal_Group
                GROUP BY p_PS_Project, m_Meter_Name`;

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
                console.log(row.WO_Num, row.WO_Department, row.Goal_Group, row.Completion, row.Goal, row.Units);
                console.log(row.m_Meter_Name, row.m_Meter_Reading, row.m_Reading_Date);
            });

            // res.json({"Message":"Success",
            //             "Data":rows});

            res.render("test", {rows: rows});
        }
    }); 
});


// FIXME!!!!!! Trying to use this
app.get('/metertest9', (req, res, next) => {
    // Get project and WO info; displaying projects individually
    let sqlProj = `SELECT p_PS_Project, p_Project_Desc, p_Status,
                MeterWO.WO_Num, MeterWO.Department, MeterWO.Goal_Group, MeterWO.Completion, MeterWO.Goal, MeterWO.units
                FROM Projects, MeterWO
                WHERE
                    PS_Project = p_PS_Project
                GROUP BY p_PS_Project`;

    var projects = [];
    var meters = [];
    // var meterReading = [];
        
    db.all(sqlProj, [], (err, rows) => {
        if (err)
        {
            throw err;
        }
        else
        {
            projects = rows.map(returnProj);
            console.log(projects);

            // For-loop needed to get appropriate Goal Group for each project
            projects.forEach((row) => {
                let sqlMeter = `SELECT m_Meter_Name, m_Meter_Reading, m_Reading_Date
                                FROM Meters, MeterWO
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
                        // console.log(row.Goal_Group);
                        meters = rows2.map(returnMeter);
                        // console.log(meters);
                    }
                });
                // meterReading.push([meters]);
                // console.log(meterReading);
                // meters = [];

                // ERROR: results in "TypeError: req.next is not a function" and crashes
                // res.render("metertest", {proj: projects, mtr: meters});

            });
        }

        console.log(meters);

        // meterReading = projects.concat([meters]);

        // FIXME: Currently not rendering meters
        // res.render("metertest", {proj: projects, mtr: meters});
    });

    // ERROR: Won't render projects due to the method being out of scope
    // res.render("metertest", {proj: projects, mtr: meters});
});

function getReading(goalGroup) {
    var meterRead = [];

    let sqlMeter = `SELECT m_Meter_Name, m_Meter_Reading, m_Reading_Date
                    FROM Meters, MeterWO
                    WHERE
                        m_Goal_Group = '${goalGroup}'
                    ORDER BY m_Reading_Date DESC,
                            m_Meter_Reading DESC`;

    db.all(sqlMeter, [], (err, rows) => {
        if (err)
        {
            throw err;
        }
        else
        {
            meterRead = rows.map((item) => {
                return item;
            });
            // console.log(meterRead);
        }
    });

    return meterRead;
}

// async function showReadings(projects, sql)
// {
//     let reading = await db.all(sql);

//     rows.forEach(async function (item, index, reading) {
//         let q = reading[index];
        
//         let sqlMeter = `SELECT m_Meter_Name, m_Meter_Reading, m_Reading_Date
//                         FROM Meters, MeterWO
//                         WHERE
//                             m_Goal_Group = '${result[index].}'
//                         ORDER BY m_Reading_Date DESC,
//                                 m_Meter_Reading DESC`
//         let 
//     });
// }

app.get('/metertest12',(req, res, next) => {
    let sqlProj = `SELECT p_PS_Project, p_Project_Desc, p_Status,
                    MeterWO.WO_Num, MeterWO.Department, MeterWO.Goal_Group, MeterWO.Completion, MeterWO.Goal, MeterWO.units
                    FROM Projects, MeterWO, Meters
                    WHERE
                        PS_Project = p_PS_Project
                        AND m_Goal_Group = Goal_Group
                    GROUP BY p_PS_Project`;

    var projects = [];
    var meters = [];
        
    db.each(sqlProj, [], (err, row) => {
        if (err)
        {
            throw err;
        }
        else
        {
            projects.push(row);
            console.log(projects);
            
            let sqlMeter = `SELECT m_Meter_Name, m_Meter_Reading, m_Reading_Date
                    FROM Meters, MeterWO
                    WHERE
                        m_Goal_Group = '${row.Goal_Group}'
                    ORDER BY m_Reading_Date DESC,
                            m_Meter_Reading DESC`;
            
            db.all(sqlMeter, [], (err, rows) => {
                if (err)
                {
                    throw err;
                }
                else
                {
                    meters = rows.map((item) => {
                        return item;
                    });
                    console.log(meters);
                }
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
    console.log("Server started on port 3000");
  });