const table = document.querySelector("table");
let rows = table.getElementsByTagName("tr");
const addButton = document.getElementById("new-round");

document.addEventListener("DOMContentLoaded", init);
const base = "https://script.google.com/macros/s/AKfycbxvREk2z-T40i2JYUhA2UnZWNqHc6udrFR1X0Mi_o2dsrK7sM4bUi3mgrBtlBj4FCwR/exec";

const getInfo = "?function=getmatch&id=";
const addround = "?function=addround&id=";

function init()
{
  var urlParams = new URLSearchParams(window.location.search);
  var id = urlParams.get("id");

  fetch(base+getInfo+id)
    .then(res => res.text())
    .then(rep=>{

        const obj = JSON.parse(rep);
        console.log(obj);
        const fightTitle = document.getElementById("fightid");
        fightTitle.textContent = "Fight #"+(obj[0].id-3);

        const eventName = document.getElementById("event-name");
        eventName.textContent = obj[0]["name"];

        const weight = document.getElementById("weight");
        weight.textContent = obj[0]["weight"];

        const color = document.getElementById("color");
        color.textContent = obj[0]["color"];

        const belt = document.getElementById("belt");
        belt.textContent = obj[0]["belt"];

        const opponent = document.getElementById("opponent");
        opponent.textContent = obj[0]["opponent"];

        const result = document.getElementById("result");
        result.textContent = obj[0]["result"];

        const date = document.getElementById("date");
        date.textContent = formatDateToYYYYMMDD(obj[0]["date"]);

        if(obj[0]["round"]){
          populateTable(JSON.parse(obj[0]["round"]));
        }
    })
  edit();
  addButton.addEventListener("click", function() {
    // Clone the last row to create a new row
    fetch(base+addround+id, { method: 'POST'})
    .then(res => res.text())
    .then(rep=>{
      window.location.reload();
    });
});
}

function populateTable(data)
{
  
  for(let i = 0; i < data.length; i++)
  {
    const item = data[i];
    console.log(item);
    const row = table.insertRow(-1);
    row.id = i;

    const cellTitle = row.insertCell();
    cellTitle.innerHTML = "Round "+(i+1);

    const cell = row.insertCell();
    cell.innerHTML = item;
    cell.setAttribute("contenteditable", "true");
    edit();
  }
  
}

function edit()
{
  rows = table.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {

        const row = rows[i];
    
        const editableCells = row.querySelectorAll('.editable');
        
        editableCells.forEach(function(cell) {
          cell.setAttribute("contenteditable", "true");
    
          cell.addEventListener("input", function() {
            // Handle the content change here for the editable cells
            console.log("Cell content changed:", cell.textContent);
            console.log("Row ID:", row.id);
          });
        });
    }
}

function formatDateToYYYYMMDD(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB'); // Change 'en-GB' to your desired locale
}