CREATE TABLE workorder_tbl(
WONUM decimal(9,0) not null,
REPORTDATE date,
ALIAS char(50),
LOCATION char(4),
LOC_DESC varchar(150),
WORKTYPE char(4),
DESCRIPTION varchar(100),
DETAIL_DESCRIPTION varchar(150),
ASSET_TYPE char(50),
BARTDEPT char(4),
STATUS char(10),
ACTSTART date,
ACTFINISH date,
ACTUAL_LABOR_HOURS decimal(5,0),
MATERIAL_COST decimal(5,0),
PROBLEM_CODE_DESC varchar(150),
REASON_TO_REPAIR_DESC varchar(150),
COMPONENT_DESC varchar(150),
PART_FAILURE_DESC varchar(150),
WORK_ACCOMP_DESC varchar(150)
);

