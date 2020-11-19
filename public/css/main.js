var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
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

function getWO(){
  var data = "";
  var desc=description;
  var startDt=s_startdate;
  var endDt=s_finishdate;
  var dept=department;
  var locDesc=l_description;
}


function getHours(){
  var type= "";
  var work= "";
  var dep= "";
}