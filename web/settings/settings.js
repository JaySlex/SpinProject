const base = "https://script.google.com/macros/s/AKfycbwaQItyp4u-__LYJBTjO4ZwM6M_wW26AgF5bUezfvJ4CcrWs2YnYRZ7jT3l99nGwFSP/exec";

const getInfo = "?function=getinfo";

const setinfo = "?function=setinfo";

document.addEventListener("DOMContentLoaded", init);

var form = document.querySelector("form");

function init()
{
    console.log("ready");
    fetch(base+getInfo)
    .then(res => res.text())
    .then(rep=>{

        const obj = JSON.parse(rep);
        const profilName = document.getElementById("username");
        profilName.value = obj["name"];

        const weight = document.getElementById("weight");
        weight.value = obj["weight"];

        const age = document.getElementById("age");
        age.value = obj["age"];

        const belt = document.getElementById("belt");
        belt.value = obj["belt"];

        const pp = document.getElementById("profile-picture");
        if(obj["profile-picture"]){
            pp.value = obj["profile-picture"];
        }
    })
}

form.addEventListener("submit", function(event) {
    event.preventDefault();
  
    /*var eventName = document.getElementById("event-name").value;
    var weight = document.getElementById("weight").value;
    var color = document.getElementById("color").value;
    var opponent = document.getElementById("opponent").value;
    var result = document.getElementById("result").value;
    var date = document.getElementById("date").value;
  
    console.log("Event Name:", eventName);
    console.log("Weight:", weight + " kg");
    console.log("Opponent:", opponent);
    console.log("Result:", result);
    console.log("Date:", date);*/

    fetch(base+setinfo, { method: 'POST', body: new FormData(form)})
    .then(() => 
    { 
        window.location.href = "../index.html";
    })
    .catch(error => console.error('Error!', error.message))
});