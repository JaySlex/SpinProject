var form = document.querySelector("form");
const basedURL = "https://script.google.com/macros/s/AKfycbxMS_5HMHuO8rt-u7wykYV9CCkDpcRmaPLLdFL8ypZZZMYvMDQ-qPaglaFvMnrL8eA/exec";
const scriptURL = "?function=addmatch";

var submitButton = document.querySelector(".green-button");
var user = "&user=";
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

    fetch(basedURL+scriptURL+user, { method: 'POST', body: new FormData(form)})
    .then(() => 
    { 
        window.location.href = "../events/events.html";
    })
    .catch(error => console.error('Error!', error.message))
});