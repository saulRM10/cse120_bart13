-- create tables.
CREATE TABLE workorders(
wonum decimal(9,0) not null PRIMARY KEY,
description varchar(100) NULL,
detail_description varchar(150) NULL,
department char(4),
work_type char(4),
asset_type char(50),
alias char(50)
);
CREATE TABLE location (
l_wonum decimal(9,0) not null PRIMARY KEY,
l_location char(4),
l_description varchar(150) NULL
);
CREATE TABLE status(
s_wonum decimal(9,0) not null PRIMARY KEY,
s_status char(10),
s_reportdate date,
s_startdate date,
s_finishdate date,
s_labor_hours decimal(5,0) NULL
);
CREATE TABLE repair(
r_wonum decimal(9,0) not null PRIMARY KEY,
r_problem_code varchar(150) NULL,
r_reason varchar(150) NULL,
r_component_desc varchar(150) NULL,
r_part_failure_desc varchar(150) NULL,
r_work_accomp_desc varchar(150) NULL
);

--populate tables in database.
INSERT INTO workorders
SELECT WONUM,DESCRIPTION,
DETAIL_DESCRIPTION,BARTDEPT,WORKTYPE,
ASSET_TYPE,ALIAS
FROM workorder_tbl;


INSERT INTO location
SELECT WONUM,LOCATION,
LOC_DESC
FROM workorder_tbl;

INSERT INTO status
SELECT WONUM,STATUS,
REPORTDATE,ACTSTART,ACTFINISH,ACTUAL_LABOR_HOURS
FROM workorder_tbl;


INSERT INTO repair
SELECT WONUM,PROBLEM_CODE_DESC,
REASON_TO_REPAIR_DESC,COMPONENT_DESC,PART_FAILURE_DESC,WORK_ACCOMP_DESC
FROM workorder_tbl;