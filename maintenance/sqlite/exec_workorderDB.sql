-- get all work orders and their listed information that will be displayed in the work order list.
SELECT wonum, work_type, asset_type, s_reportdate,l_location,s_status
FROM workorders, status, location
WHERE wonum=s_wonum AND wonum=l_wonum;


-- get all work orders and their descriptive information that will be displayed when a user selects a work order.

SELECT wonum,description, s_startdate,s_finishdate,department,l_description
FROM workorders, status, location
WHERE wonum=s_wonum AND wonum=l_wonum;

-- collect data from each asset type for calculating expected labor hours.
SELECT asset_type,work_type, s_labor_hours
FROM workorders, status
WHERE wonum=s_wonum;