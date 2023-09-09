const base = "https://script.google.com/macros/s/AKfycbxMS_5HMHuO8rt-u7wykYV9CCkDpcRmaPLLdFL8ypZZZMYvMDQ-qPaglaFvMnrL8eA/exec";

const getInfo = "?function=getinfo";

const setinfo = "?function=setinfo";

var user = "&user=";

document.addEventListener("DOMContentLoaded", init);
const logoff = document.getElementById("red-button");
var form = document.querySelector("form");

function init()
{
    if (localStorage.getItem('username')) {
        // Data exists, you can retrieve it
        var data = localStorage.getItem('username');
        console.log('Data found in localStorage: ' + data);
        user = user+data;
        console.log(user);
        }
        else
        {
            window.location.href = "../register/register.html";
        }
    console.log("ready");
    fetch(base+getInfo+user)
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
    });

    logoff.addEventListener("click", function() {
        // Clone the last row to create a new row
        localStorage.removeItem('username');
        window.location.href = "../login/login.html";
    });
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

    fetch(base+setinfo+user, { method: 'POST', body: new FormData(form)})
    .then(() => 
    { 
        window.location.href = "../index.html";
    })
    .catch(error => console.error('Error!', error.message))
});