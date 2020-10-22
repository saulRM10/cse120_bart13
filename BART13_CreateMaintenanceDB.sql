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
    WO_num int(255),
    WO_desc varchar(255),
    WO_alias int(255),
    WO_location varchar(255),
    WO_workType char(2),
    WO_assetType varchar(255),
    WO_status char(255),
    WO_BARTdept varchar(255),
    WO_work_accomp_desc varchar(255)
);

-- Connect WO and location by WO_num

/*
WO_Loc
    WO_num
    location
    location_desc

*/

create table WorkOrder_Location (
    WO_l_num int(255),
    WO_l_location varchar(255),
    WO_l_locDesc varchar(255)
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

create table WorkOrder_status (
    WO_s_num int(255),
    WO_s_status varchar(255),
    WO_s_reportDate date,
    WO_s_startDate date,
    WO_s_finishDate date,
    WO_s_laborHours int(255)
);

/*
WO_ProbDesc
    WONum
    Problem_code_desc
    reasons_to_repair_desc
    component_desc
    part_failure_desc
*/

create table WorkOrder_ProbDesc (
    WO_pd_num int(255) not null,
    WO_pd_codeDesc char(255) not null,
    WO_pd_reasonDesc char(255) not null,
    WO_pd_componentDesc char(255) not null,
    WO_pd_partfailDesc char(255) not null
);

/*
Assets
    AssetNum
    Reading
    Reading_Date
    delta (change in reading)
    Reading_source
    enter_date
    description
*/

-- Get Assets from Power and AFC Readings
create table assets (
    a_assetNum int(255),
    a_reading float(24),
    a_readDate date,
    a_delta float(24),
    a_readSrc varchar(255),
    a_enterDate date,
    a_desc varchar(255)
);

/*
Power Meter Data
    BARTDept
    AssetNum
    Reading
    EnterDate
*/
create table Power_MeterData (
   pmd_BARTDept char(255),
   pmd_assetNum varchar(255),
   pmd_reading int(255),
   pmd_enterDate date
);


/*
AFC Meter Data
    WorkOrderNum
    WorkType
    Department
    ReportDate
    Location
    Status
*/
create table AFC_MeterData (
    afc_workOrderNum int(255),
    afc_workType char(2),
    afc_BARTDept char(255),
    afc_reportDate date,
    afc_location varchar(255),
    afc_status char(255)
);

/*
delete from Power_MeterData;
*/