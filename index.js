const base = "https://script.google.com/macros/s/AKfycbxMS_5HMHuO8rt-u7wykYV9CCkDpcRmaPLLdFL8ypZZZMYvMDQ-qPaglaFvMnrL8eA/exec";

const getInfo = "?function=getinfo";
const getEvents = "?function=getevents";
document.addEventListener("DOMContentLoaded", init);

var user = "&user=";
function init()
{
    if (localStorage.getItem('username')) {
        // Data exists, you can retrieve it
        var data = localStorage.getItem('username');
        console.log('Data found in localStorage: ' + data);
        user = user+data;
        console.log(user);
    }else
    {
        window.location.href = "./register/register.html";
    }

    console.log("ready");
    fetch(base+getInfo+user)
    .then(res => res.text())
    .then(rep=>{

        const obj = JSON.parse(rep);
        const profilName = document.querySelector(".profile-name");
        profilName.textContent = obj["name"];

        const weight = document.getElementById("weight");
        weight.textContent = "Poids: " + obj["weight"] + "kg";

        const age = document.getElementById("age");
        age.textContent = "Âge: " + obj["age"];

        const belt = document.getElementById("belt");
        belt.textContent = "Ceinture: " + obj["belt"];

        const wins  = parseInt(obj["win"]);
        const losses  = parseInt(obj["loss"]);

        const winText = document.getElementById("win");
        winText.textContent = "Victoires: " + wins;
        const lossText = document.getElementById("loss");
        lossText.textContent = "Défaites: " + losses;

        const ratio = wins / (wins + losses);


        const winPercent = ratio*100;

        document.getElementById("win-bar").style.width = winPercent+"%";
        document.getElementById("lose-bar").style.width = 100-winPercent+"%";
        
        if(obj["profile-picture"])
        {
            document.getElementById("profile-picture").src = obj["profile-picture"];
        }
    })

    fetch(base+ getEvents+user)
    .then(res => res.text())
    .then(rep=>{

        populateTable(JSON.parse(rep).reverse());

    })
}


function populateTable(data) {
    const table = document.getElementById("myTable");

    var count = 4;
    data.forEach(item => {
        count--;
        
        if(count >= 0)
        {
            const row = table.insertRow(-1);
            Object.keys(item).forEach(key => {
                row.id = item.id;
                row.addEventListener("click", function () {
                    window.location.href = "./match/match.html?id="+item.id;
                });
                if (key !== "id") { // Exclude the "id" property
                    const cell = row.insertCell();
                    if (key === "date") {
                        cell.innerHTML = formatDateToYYYYMMDD(item[key]);
                    } else {
                        cell.innerHTML = item[key];
                    }
                }
            });
        }
    });
}

function formatDateToYYYYMMDD(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // Change 'en-GB' to your desired locale
}