-- Obtain all meter work orders from the projects via PS_PROJECT
SELECT PS_Project, WO_Num, Department, 
FROM MeterWO, Meters, Project
WHERE PS_Project = p_PS_Project;

-- Obtain meter readings for each project work order to display
SELECT 

-- Obtain meter work orders from the meters via Goal_Group
SELECT 
FROM MeterWO, Meters, Project
WHERE Goal_Group = m_Goal_Group;