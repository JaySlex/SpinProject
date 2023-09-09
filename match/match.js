const table = document.querySelector("table");
let rows = table.getElementsByTagName("tr");
const addButton = document.getElementById("new-round");
const deleteMatchButton = document.getElementById("delete-match");

document.addEventListener("DOMContentLoaded", init);
const base = "https://script.google.com/macros/s/AKfycbzGjEJofU8oVp8aHrGkplA4ZqKJ_l_zTKxcQBiTcEvex5HITdP9YX3Kd0oxew1OKRk/exec";

var urlParams = new URLSearchParams(window.location.search);
var id = urlParams.get("id");

const getInfo = `?function=getmatch&id=${id}`;
const addround = `?function=addround&id=${id}`;
const modifyround = `?function=modifyround&id=${id}`;
const deletematch = `?function=deletematch&id=${id}`;
const setlink = `?function=setlink&id=${id}`;

var user = "&user=";
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
  fetch(base+getInfo+user)
    .then(res => res.text())
    .then(rep=>{

        const obj = JSON.parse(rep);
        console.log(obj);
        const fightTitle = document.getElementById("fightid");
        fightTitle.textContent = "Combat #"+(obj[0].id-3);

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

        const link = document.getElementById("link");
        link.value = obj[0]["link"];
        link.addEventListener("blur", function() {
          // Handle the content change here for the editable cells
          console.log("Link changed", link.value);
          
          changeLink(link.value);
        });

        if(obj[0]["round"]){
          populateTable(JSON.parse(obj[0]["round"]));
        }
  });

  addButton.addEventListener("click", function() {
    // Clone the last row to create a new row
    fetch(base+addround+user, { method: 'POST'})
    .then(res => res.text())
    .then(rep=>{
      window.location.reload();
    });
  });

  deleteMatchButton.addEventListener("click", function() {
    // Clone the last row to create a new row
    fetch(base+deletematch+user, { method: 'POST'})
    .then(res => res.text())
    .then(rep=>{
    }).catch(f=>{
      window.location.href = "../events/events.html";
    }).finally(e=>{
      window.location.href = "../events/events.html";
    });
  });
}

function populateTable(data)
{
  
  for(let i = 0; i < data.length; i++)
  {
    const item = data[i];

    const row = table.insertRow(-1);
    row.id = i;

    const cellTitle = row.insertCell();
    cellTitle.innerHTML = "Round "+(i+1);

    const cell = row.insertCell();
    cell.innerHTML = item;
    cell.setAttribute("contenteditable", "true");
    cell.className = "editable";
    
  }
  edit();
}

function edit()
{
    rows = table.getElementsByTagName("tr");
    
    for (let i = 0; i < rows.length; i++) {

        const row = rows[i];
    
        const editableCells = row.querySelectorAll('.editable');
        
        editableCells.forEach(function(cell) {
          cell.setAttribute("contenteditable", "true");
          
          cell.addEventListener("blur", function() {
            // Handle the content change here for the editable cells
            console.log("Cell content changed:", cell.textContent);
            console.log("Row ID:", row.id);
            changeCell(row.id, cell.textContent);
          });
        });
    }
}

function changeCell(id, cellContent)
{
  fetch(base+modifyround+ `&round=${id}&info=${cellContent}`+user, { method: 'POST'})
  .then(res => res.text())
  .then(rep=>{
    window.location.reload();
  });
}
function changeLink(cellContent)
{
  fetch(base+setlink+ `&link=${cellContent}`+user, { method: 'POST'})
  .then(res => res.text())
  .then(rep=>{
    console.log(rep);
    window.location.reload();
  });
}
function formatDateToYYYYMMDD(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB'); // Change 'en-GB' to your desired locale
}