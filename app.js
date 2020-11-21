
// set up server 

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');

// use public folder with css and images 
app.use(express.static("public"))
let description ="";
let start_Date ="";
let end_Date = "";

// bottom tabs t

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


app.get("/", function(req, res){
    
    // center tabs 
    description ="COIN HANDLING UNIT,ALTERED FOR TVM";
    start_Date ="14-SEPT-20";
    end_Date ="19-SEPT-20";

    // bottom tabs 
    loc_desc= "AFC Repair Holding location";
    brt_dept = "AFC";
    aprox_hrs = "3";

    // main section 
    work_order_number ="17333715";
    work_type = "CM";
    asset_type = "AFC";
    reported_date = "14-SEPT-20";
    location = "AFC-REPAIR";
    stat ="HOLD";


    res.render("maintenance", { description: description ,startDate: start_Date, endDate:end_Date , locationDescription:loc_desc,  dept: brt_dept, hrs:aprox_hrs , WorkOrderNum: work_order_number, WorkType:work_type
    , asset:asset_type, rep_date:reported_date, location:location , status:stat});

    // ejs tag name : js variable 
});

app.listen(3000, function(){
    console.log("server started on port 3000");
});