
-- Filter completed work orders by status


-- Meter Readings

/*
Meters
    Meter_Name
    Goal_Group
    Meter_Reading
    Reading_date
    Meter_Description
    
*/

create table Meters (
    meter_name char(255) not null,
    meter_goalGroup char(255) not null,
    meter_reading int(255) not null,
    meter_desc char(255) not null
);

-- Insertions needs to be automated
insert into Meters (
    meter_name,
    meter_goalGroup,
    meter_reading,
    meter_desc
);

delete from Meters;

-- Meter WO and Meters Connected/organized via goal group
-- Meter WO and Projects connected by PS_Project
-- Linked via goal group

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

create table Meter_WorkOrder (
    m_WO_PSproject char(7) not null,
    m_WO_num int(255) not null,
    m_WO_dept char(255) not null,
    m_WO_loc char(255) not null,
    m_WO_goalGroup char(255) not null,
    m_WO_type char(255) not null,
    m_WO_tpid int(255) not null,
    m_WO_goal int(255) not null,
    m_WO_units char(255) not null,
    m_WO_reportDate char(255) not null,
    m_WO_desc char(255) not null,
    m_WO_status char(255) not null
);

insert into Meter_WorkOrder (
    m_WO_PSproject,
    m_WO_num,
    m_WO_dept,
    m_WO_loc,
    m_WO_goalGroup,
    m_WO_type,
    m_WO_tpid,
    m_WO_goal,
    m_WO_units,
    m_WO_reportDate,
    m_WO_desc,
    m_WO_status
);

delete from Meter_WorkOrder;

/*
Projects
    PS_Project
    Description
    Activity
    Activity_Desc
*/
create table Projects (
    project_PSProject char(255) not null,
    project_desc char(255) not null,
    project_activity char(255) not null,
    project_activity_desc char(255) not null
);

insert into Projects (
    project_PSProject,
    project_desc,
    project_activity,
    project_activity_desc
);

delete from Projects;


/*
Both Power and AFC Meter Data have the exact same attributes
    - Both Power and AFC Meter Data are connected to Work Orders via BartDept
    - All for the maintenance team
*/

/*
Two tables contained in each data: Department and Assets
    - The two separate tables in each are connected via AssetNum
*/

/*
Department
    BartDept
    AssetNum
    MeterName
    Status
*/
create table department (
    d_BARTdept char(255),
    d_assetNum int(255),
    d_meterName char(255),
    d_status char(255)
);

insert into department (
    d_BARTdept,
    d_assetNum,
    d_meterName,
    d_status
);

delete from department;