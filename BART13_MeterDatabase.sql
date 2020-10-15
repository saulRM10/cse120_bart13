-- Filter completed work orders by status

/*
WorkOrders
    WONum
    Description
    Alias
    Location
    Work_type
    Asset_type
    Status
    BARTDept
    Work_accomp_desc
*/

-- Connect WO and location by WO_num

/*
WO_Loc
    WO_num
    location
    location_desc
*/

/*
WO_Status
    WONum
    Status
    report_date
    start_date (act_start)
    finish_date (act_finish)
    labor_hours
*/

/*
WO_ProbDesc
    WONum
    Problem_code_desc
    reasons_to_repair_desc
    component_desc
    part_failure_desc
*/

create table WorkOrder (
    -- Reference
    /*
    r_regionkey decimal(2,0) not null,
    r_name char(25) not null,
    r_comment varchar(152)
    */
);

-- Add create statements for all tables

create table MeterReading (
    /*
    n_nationkey decimal(3,0) not null,
    n_name char(25) not null,
    n_regionkey decimal(2,0) not null,
    n_comment varchar(152)
    */
);
