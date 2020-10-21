insert into WorkOrder (
    WO_num,
    WO_desc,
    WO_alias,
    WO_location,
    WO_workType,
    WO_assetType,
    WO_status,
    WO_BARTdept,
    WO_work_accomp_desc
)
values();

insert into WorkOrder_Loc (
    WO_l_num,
    WO_l_location,
    WO_l_locDesc
)
values();

insert into WorkOrder_Location (
    WO_l_num,
    WO_l_location,
    WO_l_locDesc
)
values();

insert into WorkOrder_status (
    WO_s_num,
    WO_s_status,
    WO_s_reportDate,
    WO_s_startDate,
    WO_s_finishDate,
    WO_s_laborHours
)
values();

insert into WorkOrder_ProbDesc (
    WO_pd_num,
    WO_pd_codeDesc,
    WO_pd_reasonDesc,
    WO_pd_componentDesc,
    WO_pd_partfailDesc
)
values();

insert into assets (
    a_assetNum,
    a_reading,
    a_readDate,
    a_delta,
    a_readSrc,
    a_enterDate,
    a_desc
)
values();

insert into Power_MeterData (
    pmd_BARTDept,
    pmd_assetNum,
    pmd_reading,
    pmd_enterDate
)
values();

insert into Power_MeterData (
    pmd_BARTDept,
    pmd_assetNum,
    pmd_reading,
    pmd_enterDate
)
values();


