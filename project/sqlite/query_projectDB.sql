-- Obtain all projects via PS_PROJECT
SELECT p_PS_Project, p_Description, p_Status
FROM Projects, MeterWO;

-- Obtain meter readings for each project work order to display when clicked on
-- Meter readings must be displayed within the same work order
SELECT WO_Num, Department, Goal_Group, Goal, Units, m_Meter_Name, m_Meter_Reading, m_Reading_Date, Completion
FROM MeterWO, Meters, Projects
WHERE m_Goal_Group = Goal_Group AND PS_Project = p_PS_Project;

-- Need to display meters belonging to the same goal group
SELECT Meters.m_Meter_Name, Meters.m_Meter_Reading, Meters.m_Reading_Date, Meters.m_Goal_Group, MeterWO.Goal 
FROM Meters, MeterWO
WHERE m_Goal_Group IN (
        SELECT GOAL_GROUP
        FROM meterreading_tbl
        GROUP BY GOAL_GROUP
        HAVING COUNT(PS_PROJECT) > 1
    );


-- Display Activity
SELECT *
FROM Activity;