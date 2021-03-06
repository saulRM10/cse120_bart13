-- Obtain all projects via PS_PROJECT
SELECT p_PS_Project, p_Project_Desc, p_Status
FROM Projects, MeterWO;

SELECT p_PS_Project, p_Project_Desc, p_Status
FROM Projects
GROUP BY p_PS_Project;

-- Obtain meter readings for each project work order to display when clicked on
-- Meter readings must be displayed within the same work order
SELECT WO_Num, Department, Goal_Group, Goal, Units, m_Meter_Name, m_Meter_Reading, m_Reading_Date, Completion
FROM MeterWO, Meters, Projects
WHERE m_Goal_Group = Goal_Group AND PS_Project = p_PS_Project;

SELECT p_PS_Project, p_Project_Desc
FROM Projects
GROUP BY p_Project_Desc
ORDER BY p_PS_Project ASC;

SELECT MeterWO.WO_Num, MeterWO.Department, MeterWO.Goal_Group, MeterWO.Completion, MeterWO.Goal, MeterWO.Units
FROM MeterWO, Projects
WHERE
    PS_Project = p_PS_Project
GROUP BY PS_Project;

SELECT MeterWO.WO_Num, MeterWO.Department, MeterWO.Goal_Group, MeterWO.Completion, MeterWO.Goal, MeterWO.units
FROM MeterWO INNER JOIN Projects on MeterWO.PS_Project = Projects.p_PS_Project
GROUP BY p_PS_Project;

SELECT m_Meter_Name, m_Goal_Group, m_Meter_Reading, m_Reading_Date
FROM Meters
GROUP BY m_Goal_Group
ORDER BY m_Reading_Date DESC,
        m_Meter_Name ASC;


-- Need to display meters belonging to the same goal group
SELECT Meters.m_Meter_Name, Meters.m_Meter_Reading, Meters.m_Reading_Date, Meters.m_Goal_Group, MeterWO.Goal 
FROM Meters, MeterWO
WHERE m_Goal_Group IN (
        SELECT GOAL_GROUP
        FROM meterreading_tbl
        GROUP BY GOAL_GROUP
        HAVING COUNT(PS_PROJECT) > 1
    );



SELECT m_Meter_Name, m_Meter_Reading, m_Reading_Date
FROM Meters
WHERE
    m_Goal_Group = 'BHT C1 L,BHT C2 L'
ORDER BY m_Meter_Name;

SELECT m_Meter_Name, m_Meter_Reading, m_Reading_Date
FROM Meters
WHERE
    m_Goal_Group = 'A1 DRAIN,A1 DRAIN 2'
ORDER BY m_Meter_Name;

SELECT m_Meter_Name, m_Meter_Reading, m_Reading_Date
FROM Meters
WHERE
    m_Goal_Group = 'DF PADS'
ORDER BY m_Meter_Name;

SELECT m_Meter_Name, m_Meter_Reading, m_Reading_Date
FROM Meters
WHERE
    m_Goal_Group = 'C-CABLE A'
ORDER BY m_Meter_Name;

SELECT m_Meter_Name, m_Meter_Reading, m_Reading_Date
FROM Meters
WHERE
    m_Goal_Group = 'DT INSTALL'
ORDER BY m_Meter_Name;

SELECT COUNT(DISTINCT m_Goal_Group)
FROM Meters;

SELECT DISTINCT m_Goal_Group
FROM Meters;



SELECT Meters.m_Meter_Name, Meters.m_Meter_Reading, Meters.m_Reading_Date, Meters.m_Goal_Group, MeterWO.Goal 
FROM Meters, MeterWO
WHERE m_Goal_Group = 'A1 DRAIN,A1 DRAIN 2';

-- INSERT INTO meterreading_tbl(COMPLETION)
-- VALUES
--     (METER_READING / GOAL);

-- SELECT (CAST (METER_READING AS float) / CAST (GOAL AS float)) * 100.0
-- FROM meterreading_tbl;

UPDATE meterreading_tbl
SET COMPLETION = ((CAST (METER_READING AS float)) / (CAST (GOAL AS float))) * 100.0
WHERE COMPLETION = '';

DELETE FROM meterreading_tbl
WHERE COMPLETION IS NOT NULL;


-- Display Activity
SELECT *
FROM Activity;

SELECT *
FROM Test
ORDER BY t_PS_Project ASC,
        t_Meter_Name ASC,
        t_Meter_Reading ASC,
        t_Goal ASC;

SELECT t_PS_Project, t_WO_Num, t_Meter_Name, t_Meter_Reading, t_Goal, t_Meter_Date
FROM Test
ORDER BY t_PS_Project ASC,
        t_Meter_Name ASC,
        t_Meter_Reading ASC,
        t_Goal ASC;
