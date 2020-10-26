CREATE TABLE MeterWO (
    PS_Project varchar(7),
    WO_num decimal(9,0),
    department char(255),
    type char(4),
    TPID decimal(10,0),
    goal int(255),
    units char(20),
    reported_date date,
    Description char(255),
    status char(10)
);

CREATE TABLE Meters (
    m_Meter_Name varchar(30),
    m_Goal_Group varchar(255),
    m_Meter_Reading int(255),
    m_Reading_Date date,
    m_Meter_Desc varchar(255)
);

CREATE TABLE Projects (
    p_PS_Project varchar(7),
    p_Description char(255),
    p_Activity varchar(255),
    p_Activity_Desc varchar(255)
);