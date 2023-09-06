document.addEventListener("DOMContentLoaded", init);

function populateTable(data) {
    const table = document.getElementById("myTable");

 
    data.forEach(item => {
        const row = table.insertRow(-1);
        Object.keys(item).forEach(key => {
            row.id = item.id;
            if (key !== "id") { // Exclude the "id" property
                const cell = row.insertCell();
                if (key === "date") {
                    cell.innerHTML = formatDateToYYYYMMDD(item[key]);
                } else {
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
    fetch('https://script.google.com/macros/s/AKfycbx4Svc87jYI81AVZIrlZw5XlIk_e4CPZUJ2bpdDnBmbVzgoyFoiC-Bqk0i52qz8ebfL/exec?function=getevents')
    .then(res => res.text())
    .then(rep=>{

        populateTable(JSON.parse(rep));

    })
}