const basedURL = "https://script.google.com/macros/s/AKfycbxMS_5HMHuO8rt-u7wykYV9CCkDpcRmaPLLdFL8ypZZZMYvMDQ-qPaglaFvMnrL8eA/exec";
const getevents = "?function=getevents";

document.addEventListener("DOMContentLoaded", init);
var user = "&user=";

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
    fetch(basedURL+getevents+user)
    .then(res => res.text())
    .then(rep=>{

        populateTable(JSON.parse(rep).reverse());

    })
}