var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    //var parent = document.getElementsByClassName("active");
   // var child = document.createElement("p");
    //document.body.prepend(child);
  

    var curr=this.getElementsByClassName("wo")[0];
    var cont= curr.textContent;
    //function to get to the server
    var temp1=this.getElementsByClassName("at")[0];
    var temp2=this.getElementsByClassName("wt")[0];
    var temp3=this.getElementsByClassName("d")[0];
    var type= temp1.textContent;
    var work= temp2.textContent;
    var dep= temp3.textContent;
    
    
    var content = this.nextElementSibling;
    var topRow=content.getElementsByClassName("topDetails")[0];
    var midRow=content.getElementsByClassName("midDetails")[0];
    var bottRow=content.getElementsByClassName("bottomDetails")[0];
    $.get("/displayWOinfo", {cont}, function(response){
    var data = response;
    var desc=data.description;
    var startDt=data.s_startdate;
    var endDt=data.s_finishdate;
    var dept=data.department;
    var locDesc=data.l_description;
    //top row
    var childData3 = document.createElement("td");
    childData3.innerHTML = endDt;
    var childData2 = document.createElement("td");
    childData2.innerHTML = startDt;
    var childData1 = document.createElement("td");
    childData1.innerHTML =desc;

    topRow.prepend(childData3);
    topRow.prepend(childData2);
    topRow.prepend(childData1);
    //middle row
    var childData6 = document.createElement("td");
    childData6.innerHTML=dept;
    var childData5 = document.createElement("td");
    var childData4 = document.createElement("td");
    midRow.prepend(childData6);
    midRow.prepend(childData5);
    midRow.prepend(childData4);
    //bottom row
    var childData9 = document.createElement("td");
    var childData8 = document.createElement("td");
    var childData7 = document.createElement("td");
    childData7.innerHTML=locDesc;

    bottRow.prepend(childData9);
    bottRow.prepend(childData8);
    bottRow.prepend(childData7);

    });
    $.get("/displayhours", {type,work,dep}, function(response){
      var got = response;
      console.log(got)
    });
    /*
    var child = document.createElement("div");
    child.innerHTML = "<div>Hello World!</div>";
    content.prepend(child);
    */
    if (content.style.display === "block") {
      content.style.display = "none";
      topRow.querySelectorAll('*').forEach(n => n.remove());
      midRow.querySelectorAll('*').forEach(n => n.remove());
      bottRow.querySelectorAll('*').forEach(n => n.remove());
    } else {
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