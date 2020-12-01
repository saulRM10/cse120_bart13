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

// app.get('/testview', (req, res, next) => {
//     let proj = [
//         {
//             PS_Project: '15CQ011',
//             Description: 'Platform Edge Struc Rehab',
//             Status: 'INPGR'
//         },
//         {
//             PS_Project: '15CQ016',
//             Description: 'Direct Fixation Pads',
//             Status: 'WAPPR'
//         },
//         {
//             PS_Project: '15TK000',
//             Description: 'M*E CAPITALIZED MAINTENANCE',
//             Status: 'INPRG'
//         }
//     ];

//     res.render("test2.ejs", {proj: proj});
//     next();
// }, (req, res) => {

// });

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
app.get('/metertest', (req, res, next) => {
    let sql = `SELECT p_PS_Project, p_Project_Desc, p_Status,
                MeterWO.WO_Num, MeterWO.Department, MeterWO.Goal_Group, MeterWO.Completion, MeterWO.Goal, MeterWO.units,
                m_Meter_Name, m_Meter_Reading, m_Reading_Date
                FROM Projects, MeterWO, Meters
                WHERE
                    PS_Project = p_PS_Project
                    AND m_Goal_Group = Goal_Group
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
                console.log(row.WO_Num, row.WO_Department, row.Goal_Group, row.Completion, row.Goal, row.Units);
                console.log(row.m_Meter_Name, row.m_Meter_Reading, row.m_Reading_Date);
            });

            // res.json({"Message":"Success",
            //             "Data":rows});

            res.render("metertest", {rows: rows});
        }
    }); 
});

app.get('/metertest2', (req, res, next) => {
    let sql = `SELECT p_PS_Project, p_Project_Desc, p_Status,
                MeterWO.WO_Num, MeterWO.Department, MeterWO.Goal_Group, MeterWO.Completion, MeterWO.Goal, MeterWO.units
                FROM Projects, MeterWO, Meters
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
                console.log(row.p_PS_Project, row.p_Description, row.p_Status);
                console.log(row.WO_Num, row.WO_Department, row.Goal_Group, row.Completion, row.Goal, row.Units);

                let sqlMeter = `SELECT m_Meter_Name, m_Meter_Reading, m_Reading_Date
                            FROM Meters, MeterWO
                            WHERE
                                m_Goal_Group = ?
                            GROUP BY Goal_Group`;
                // let goalGroup = 'A1 DRAIN,A1 DRAIN 2';

                // db.each(sqlMeter, [goalGroup], (err, rows2) => {
                    
                //     if (err)
                //     {
                //         throw err;
                //     }
                //     else
                //     {
                //         rows2.forEach((row2) => {
                //             console.log(row2.m_Meter_Name, row2.m_Meter_Reading, row2.m_Reading_Date);
                //         });
                //     }
                // });

                // db.get(sqlMeter, [], (err, rows2) => {
                //     if (err)
                //     {
                //         throw err;
                //     }
                //     else
                //     {
                //         rows2.forEach((row2) => {
                //             console.log(row2.m_Meter_Name, row2.m_Meter_Reading, row2.m_Reading_Date);
                //         });
                //     }
                    
                //     res.render("metertest", {rows: rows}, {rows2: rows2});
                // });
            });

            // res.json({"Message":"Success",
            //         "Data":rows});
            // res.render("metertest", {rows: rows});

        }
    }); 
});

// FIXME: The meter readings need to be displayed under each respective project
app.get('/metertest', (req, res, next) => {
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
                console.log(row.p_PS_Project, row.p_Description, row.p_Status);
                console.log(row.WO_Num, row.WO_Department, row.Goal_Group, row.Completion, row.Goal, row.Units);

                let sqlMeter = `SELECT m_Meter_Name, m_Meter_Reading, m_Reading_Date
                            FROM Meters, MeterWO
                            WHERE
                                m_Goal_Group = ?
                            GROUP BY Goal_Group`;
                // let goalGroup = 'A1 DRAIN,A1 DRAIN 2';
                let goalGroup = row.m_Goal_Group;

                // async.each(row, (err2, rows2) => {
                //     // var goalGroup = item.m_Goal_Group;
                //     db.all(sqlMeter, [goalGroup], (err2, rows2) => {
                //         if (err2)
                //         {
                //             throw err2;
                //         }
                //         else
                //         {
                //             rows2.forEach((row2) => {
                //                 console.log(row2.m_Meter_Name, row2.m_Meter_Row, row2.m_Reading_Date);
                //             });
                //         }

                //     });
                // });

                db.all(sqlMeter, [row.Goal_Group], (err, rows2) => {
                    if (err)
                    {
                        throw err;
                    }
                    else
                    {
                            rows2.forEach((row2) => {
                                console.log(row2.m_Meter_Name, row2.m_Meter_Reading, row2.m_Reading_Date);
                        });
                    }
                });

            // res.json({"Message":"Success",
            //         "Data":rows});
            // res.render("metertest", {rows: rows});
            });
        }
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

// app.get('/metertest4', (req, res, next) => {
//     let sql = `SELECT p_PS_Project, p_Project_Desc, p_Status,
//                 MeterWO.WO_Num, MeterWO.Department, MeterWO.Goal_Group, MeterWO.Completion, MeterWO.Goal, MeterWO.units
//                 FROM Projects, MeterWO
//                 WHERE
//                     PS_Project = p_PS_Project
//                 GROUP BY p_PS_Project`;

//     db.all(sql, [], (err, rows) =>
//     {
//         if (err)
//         {
//             throw err;
//         }
//         else
//         {
//             let sqlMeter = `SELECT m_Meter_Name, m_Meter_Reading, m_Reading_Date
//                             FROM Meters
//                             INNER JOIN MeterWO on m_Goal_Group = Goal_Group
//                             WHERE
//                                 m_Goal_Group = '` + row.Goal_Group + 
//                             `'
//                             ORDER BY m_Reading_Date DESC`;

//             var readings = rows.map((row) => {
//                 return {
//                     meterName: row.m_Meter_Name,
//                     meterReading: row.m_Meter_Reading,
//                     meterDate: row.m_Reading_Date
//                 }
//             });
//         }
        
//     });
// });

app.get('/metertest5', (req, res, next) => {
    let sqlProj = `SELECT p_PS_Project, p_Project_Desc, p_Status,
                MeterWO.WO_Num, MeterWO.Department, MeterWO.Goal_Group, MeterWO.Completion, MeterWO.Goal, MeterWO.units
                FROM Projects, MeterWO
                WHERE
                    PS_Project = p_PS_Project
                GROUP BY p_PS_Project`;

    async.parallel([
        function(callback) {
            db.all(sqlProj, callback)
        },
        function(rows, callback) {
            let sqlMeter = `SELECT m_Meter_Name, m_Meter_Reading, m_Reading_Date
                FROM Meters
                INNER JOIN MeterWO on m_Goal_Group = Goal_Group
                WHERE
                    m_Goal_Group = '${rows[0].Goal_Group}'
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