insert into Meters (
    meter_name,
    meter_goalGroup,
    meter_reading,
    meter_desc
)
values();

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
)
values();

insert into Projects (
    project_PSProject,
    project_desc,
    project_activity,
    project_activity_desc
)
values();

insert into department (
    d_BARTdept,
    d_assetNum,
    d_meterName,
    d_status
)
values();
