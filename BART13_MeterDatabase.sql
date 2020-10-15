
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

create table WorkOrder (
    WO_num decimal() not null,
    WO_desc char(255) not null,
    WO_alias decimal() not null,
    WO_location char(255) not null,
    WO_worktype char(2) not null,


);

-- Connect WO and location by WO_num

/*
WO_Loc
    WO_num
    location
    location_desc
*/

create table WorkOrder_Loc (
    WO_num decimal() not null,
    l_location char(255) not null,
    l_locDesc char(255) not null
);

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

-- Meter Readings

/*
Meter_WorkOrder
    PS_Project
    WO_num
    Department
    Location
    goal_group
    type
    TPID
    goal
    units
    reported_date
    Description
    status
*/

-- Meter WO and Meters Connected/organized via goal group

/*
Meters
    Meter_Name
    Goal_Group
    Meter_Reading
    Reading_date
    Meter_Description
    
*/

-- Meter WO and Projects connected by PS_Project
-- Linked via goal group

/*
Projects
    PS_Project
    Description
    Activity
    Activity_Desc
*/