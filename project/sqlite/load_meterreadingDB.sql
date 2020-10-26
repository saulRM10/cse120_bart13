CREATE TABLE meterreading_tbl (
    PROJECT varchar(3) not null,
    DEPARTMENT char(20),
    METER_DESCRIPTION varchar(150),
    METER_DATE date,
    METER_READING int(),
    METER_UNITS varchar(150),
    GOAL int(),
    METER_NAME varchar(150),
    GOAL_GROUP varchar(255),
    WONUM decimal(9,0),
    DESCRIPTION varchar(255),
    
    REPORT_DATE date,

);