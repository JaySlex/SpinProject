var form = document.querySelector("form");
const basedURL = "https://script.google.com/macros/s/AKfycbwcwf8Oo__dmRzHVTAj4Bl-J5VseHTUO3THyFVaGe9f-rA7zwRVSBZnkEvRnYF7Uwi8/exec";
const scriptURL = "?function=addmatch";

var submitButton = document.querySelector(".green-button");
  

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

    fetch(basedURL+scriptURL, { method: 'POST', body: new FormData(form)})
    .then(() => 
    { 
        window.location.href = "../events/events.html";
    })
    .catch(error => console.error('Error!', error.message))
});