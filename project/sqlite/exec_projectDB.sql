-- Obtain all projects via PS_PROJECT
SELECT PS_Project, p_Description, Status 
FROM MeterWO, Meters, Projects
WHERE PS_Project = p_PS_Project;

-- Obtain meter readings for each project work order to display when clicked on
-- Meter readings must be displayed within the same work order
SELECT WO_Num, Department, Goal_Group, Goal, Units, m_Meter_Name, m_Meter_Reading, m_Reading_Date, Completion
FROM MeterWO, Meters, Projects
WHERE m_Goal_Group = Goal_Group AND PS_Project = p_PS_Project;

-- Obtain all projects from Project
SELECT *
FROM Projects;


-- Display Activity
SELECT *
FROM Activity;