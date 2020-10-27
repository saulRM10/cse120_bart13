-- Obtain all projects via PS_PROJECT
SELECT PS_Project, p_Description, Status 
FROM MeterWO, Meters, Project
WHERE PS_Project = p_PS_Project;

-- Obtain meter readings for each project work order to display when clicked on
SELECT WO_Num, Department, Goal_Group, Goal, Units, m_Meter_Name, m_Meter_Reading, m_Reading_Date, Completion
FROM MeterWO, Meters, Project
WHERE m_Goal_Group = Goal_Group AND PS_Project = p_PS_Project;
