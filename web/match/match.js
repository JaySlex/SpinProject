const table = document.querySelector("table");
let rows = table.getElementsByTagName("tr");
const addButton = document.getElementById("new-round");

document.addEventListener("DOMContentLoaded", init);
const base = "https://script.google.com/macros/s/AKfycbwcwf8Oo__dmRzHVTAj4Bl-J5VseHTUO3THyFVaGe9f-rA7zwRVSBZnkEvRnYF7Uwi8/exec";

const getInfo = "?function=getmatch&id=4";

function init()
{
  fetch(base+getInfo)
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
    })
  edit();
}
addButton.addEventListener("click", function() {
    // Clone the last row to create a new row
    const lastRow = table.querySelector("tr:last-child");
    const newRow = lastRow.cloneNode(true);

    // Increment the ID of the new row
    const lastRowId = lastRow.getAttribute("id");
    const newRowId = "r-" + rows.length;
    newRow.setAttribute("id", newRowId);

    // Clear the content of the new row's editable cell
    const editableCell = newRow.querySelector(".editable");
    editableCell.textContent = "0-0";
    
    const neditableCell = newRow.querySelector(".non-editable");
    neditableCell.textContent = "Round " + rows.length;
    // Append the new row to the table
    table.appendChild(newRow);
    rows = table.getElementsByTagName("tr");
    edit();
});

function edit()
{
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