CREATE TABLE MeterWO (
    PS_Project varchar(7),
    WO_Num decimal(9,0),
    Department char(255),
    Location varchar(10),
    Goal_Group varchar(255),
    Type char(4),
    tpid decimal(10,0),
    Goal int(255),
    Completion float(3,2),
    Units char(20),
    Reported_Date date,
    Description char(255),
    Status char(10)
);

CREATE TABLE Meters (
    m_Meter_Name varchar(30),
    m_Goal_Group varchar(255),
    m_Meter_Reading int(255),
    m_Reading_Date date,
    m_Meter_Desc varchar(255)
    m_Completion float(3,2)
);

CREATE TABLE Projects (
    p_PS_Project varchar(7),
    p_Description char(255),
    p_Activity varchar(255),
    p_Activity_Desc varchar(255)
);

-- Populate the tables in the database
INSERT INTO MeterWO
SELECT PS_PROJECT,
    WONUM,
    DEPARTMENT,
    LOCATION,
    GOAL_GROUP,
    TYPE,
    TPID,
    GOAL,
    COMPLETION,
    METER_UNITS,
    REPORT_DATE,
    DESCRIPTION,
    STATUS
FROM meterreading_tbl;

INSERT INTO Meters
SELECT METER_NAME,
    GOAL_GROUP,
    METER_READING,
    METER_DATE,
    METER_DESCRIPTION,
    COMPLETION
FROM meterreading_tbl;

INSERT INTO Projects
SELECT PS_PROJECT,
    DESCRIPTION,
    PS_ACTIVITY,
    PS_ACTIVITY_DESC
FROM meterreading_tbl;