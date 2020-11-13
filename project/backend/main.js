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

db.serialize() {
    db.each("");
}

db.close(() => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Closed Meter database connection.');
});

app.listen(8000, function() {
    console.log("server started on port 8000");
  });