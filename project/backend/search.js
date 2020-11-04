// json ProjDB

// Create a vector for each variable from the database;
// the projects will be accessed by index for each vector
vector<string> ProjectID;
vector<string> Desc;
vector<string> Status;

vector<int> WONum;
vector<string> Dept;
vector<string> GoalGroup;
vector<int> Goal;
vector<string> Units;
vector<string> MeterName;
vector<int> MeterReading;
vector<__DATE__> ReadingDate;    // Date data type needs to be created
vector<float> Completion;

/*
void init() {
    
}
*/

// The data extraction needs to be automated

function getProjects() {
    const response = await fetch('ProjectDB.csv');  // Needs to extract from Projects table
    const data = await response.text();
    console.log(data);

    rows.forEach(index => {
        const row = index.split(',');
        console.log(row);
});
    console.log(rows);

}

function getMeterWO() {
    const response = await fetch('ProjectDB.csv');  // Needs to extract from MeterWO table
    const data = await response.text();
    console.log(data);

    rows.forEach(index => {
        const row = index.split(',');
        console.log(row);
});
    console.log(rows);
}

function getMeterInfo() {
    const response = await fetch('ProjectDB.csv');
    const data = await response.text();
    console.log(data);

    const rows = data.split('/n').slice(1)
    rows.forEach(index => {
        const row = index.split(',');
        console.log(row);
});
    console.log(rows);
}