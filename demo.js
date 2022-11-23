var nname = document.getElementById("name");
var rollno = document.getElementById("rollno");
var add = document.getElementById("add");
var email = document.getElementById("email");
var eng = document.getElementById("eng");
var math = document.getElementById("math");
var phy = document.getElementById("phy");
var chem = document.getElementById("chem");
var bio = document.getElementById("bio");

var input = document.getElementsByClassName("input");

var btn = document.getElementById("btn");

function check(){
    if(nname.value == "" || rollno.value == "" || add.value == "" || email.value =="" || eng.value == "" || math.value == "" || phy.value == "" || chem.value == "" || bio.value == ""){
        btn.disabled = true;
    }
    else{
        btn.disabled = false;
    }
}


setInterval(check, 100);