/*
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");

var curr=this.getElementsByClassName("")[0];
var cont= curr.textContent;

var curr=this.getElementsByClassName("proj")[0];
    var cont= curr.textContent;
    var temp1=this.getElementsByClassName("desc")[0];
    var temp2=this.getElementsByClassName("status")[0];
    var proj= temp1.textContent;
    var status= temp2.textContent;

    $.get("/displayWOinfo", {cont}, function(response){

    });
});
}
*/

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    //var parent = document.getElementsByClassName("active");
   // var child = document.createElement("p");
    //document.body.prepend(child);
  

    var curr=this.getElementsByClassName("ps_proj")[0];
    var psproj= curr.textContent;
    //function to get to the server
    // var temp1=this.getElementsByClassName("desc")[0];
    // var temp2=this.getElementsByClassName("stat")[0];
    var temp1=this.getElementByClassName("goalgroup")[0];

    // var desc= temp1.textContent;
    // var stat= temp2.textContent;
    var gg= temp1.textContent;
    
    var content = this.nextElementSibling;
    var topRow=content.getElementsByClassName("topDetails")[0];
    var midRow=content.getElementsByClassName("midDetails")[0];

    // Display Project WOs by PS_Project
    $.get("/displayProjWO", {psproj}, function(response){
      var data = response;
      var wo = data.WO_Num;
      var dept = data.Department;
      var goalGroup = data.Goal_Group;
      var comp = data.Completion;
      var goal = data.Goal;
      var unit = data.Units;
      
      //top row
      var childData6 = document.createElement("td");
      childData6.innerHTML = unit;
      var childData5 = document.createElement("td");
      childData5.innerHTML = goal;
      var childData4 = document.createElement("td");
      childData4.innerHTML = comp;
      var childData3 = document.createElement("td");
      childData3.innerHTML = goalGroup;
      var childData2 = document.createElement("td");
      childData2.innerHTML = dept;
      var childData1 = document.createElement("td");
      childData1.innerHTML = wo;

      topRow.prepend(childData6);
      topRow.prepend(childData5);
      topRow.prepend(childData4);
      topRow.prepend(childData3);
      topRow.prepend(childData2);
      topRow.prepend(childData1);
    });


    // Needs to display meter readings by goal group
    $.get("/displayMeterReading", {gg}, function(response){
      var data = response;

      var meterName = data.m_Meter_Name;
      var meterRead = data.m_Meter_Reading;
      var readDate = data.m_Reading_Date;
      
      //middle row
      var childData9 = document.createElement("td");
      childData9.innerHTML = readDate;
      var childData8 = document.createElement("td");
      childData8.innerHTML = meterRead;
      var childData7 = document.createElement("td");
      childData7.innerHTML = meterName;

      midRow.prepend(childData6);
      midRow.prepend(childData5);
      midRow.prepend(childData4);
    });

    if (content.style.display === "block") {
      content.style.display = "none";
      topRow.querySelectorAll('*').forEach(n => n.remove());
      midRow.querySelectorAll('*').forEach(n => n.remove());
      bottRow.querySelectorAll('*').forEach(n => n.remove());
    }
    else {
      content.style.display = "block";
      topRow.querySelectorAll('*').forEach(n => n.remove());
      midRow.querySelectorAll('*').forEach(n => n.remove());
      bottRow.querySelectorAll('*').forEach(n => n.remove());
      //var currSelect= document.getElementsByClassName("active");
    }
  });
}

// side navigation 

function openNav() {
  document.getElementById("mySidenav").style.width = " 250px";

}

// close side navigation 
function closeNav(){
  document.getElementById("mySidenav").style.width="0";
}