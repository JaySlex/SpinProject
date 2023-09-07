const basedURL = "https://script.google.com/macros/s/AKfycbwcwf8Oo__dmRzHVTAj4Bl-J5VseHTUO3THyFVaGe9f-rA7zwRVSBZnkEvRnYF7Uwi8/exec";
const getevents = "?function=getevents";

document.addEventListener("DOMContentLoaded", init);

function populateTable(data) {
    const table = document.getElementById("myTable");

 
    data.forEach(item => {
        const row = table.insertRow(-1);
        Object.keys(item).forEach(key => {
            row.id = item.id;
            row.addEventListener("click", function () {
                window.location.href = "../match/match.html?id="+item.id;
            });
            if (key !== "id") { // Exclude the "id" property
                const cell = row.insertCell();
                if (key === "date") {
                    cell.innerHTML = formatDateToYYYYMMDD(item[key]);
                } else  {
                    cell.innerHTML = item[key];
                }
            }
        });
    });
}

function formatDateToYYYYMMDD(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // Change 'en-GB' to your desired locale
}

function init()
{
    fetch(basedURL+getevents)
    .then(res => res.text())
    .then(rep=>{

        populateTable(JSON.parse(rep).reverse());

    })
}