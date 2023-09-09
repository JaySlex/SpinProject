const base = "https://script.google.com/macros/s/AKfycby8c9rJhP2raz3cy4ifH09Dc34tkp5ov3PUN7ucY6V1jUVh-asWsK-ZRGO7mMaoviIl/exec";

const createuser = "?function=createuser";


document.addEventListener("DOMContentLoaded", init);

var form = document.querySelector("form");

function init()
{
    console.log("ready");
    
    if (localStorage.getItem('username')) {
        // Data exists, you can retrieve it
        var data = localStorage.getItem('username');
        console.log('Data found in localStorage: ' + data);

        //Redirect to index
        window.location.href = "../index.html";
    }
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

    fetch(base+createuser, { method: 'POST', body: new FormData(form)})
    .then(res => res.text())
    .then(rep=>{

        const obj = JSON.parse(rep);
        console.log(obj);
        if(obj[0] === "error")
        {
            var textElement = document.getElementById("errorcode");
            textElement.style.display = "block"; // Hide the element
        }
        else 
        {
            localStorage.setItem('username', obj[1]);
            window.location.href = "../index.html";
        }
    })


});