const basedURL = "https://script.google.com/macros/s/AKfycbxMS_5HMHuO8rt-u7wykYV9CCkDpcRmaPLLdFL8ypZZZMYvMDQ-qPaglaFvMnrL8eA/exec";
const getevents = "?function=getevents";
var user = "&user=";
document.addEventListener("DOMContentLoaded", init);

const weightLabels = [];
const weightRatio = [];
const weightData = {};

const beltLabels = [];
const beltRatio = [];
const beltData = {};

const yearsLabels = [];
const yearsRatio = [];
const yearsData = {};
const soloYearsData = [];

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
    .then(rep=>
    {
      const events = JSON.parse(rep);

      //WEIGHT----------------
      events.forEach(event => {



        const { weight, result } = event;
      
        
        if (!weightData[weight]) {
          weightData[weight] = { wins: 0, losses: 0 };
        }
      
        if (result === 'Victoire') {
          weightData[weight].wins++;
        } else if (result === 'Défaite') {
          weightData[weight].losses++;
        }
       
      });

      const weightArray = Object.entries(weightData).map(([weight, { wins, losses }]) => ({
        weight: parseInt(weight),
        wins,
        losses,
      }));
      
      weightArray.forEach(w => {  
        weightLabels.push(w.weight);
        weightRatio.push(CalculateWinRate(w.wins, w.losses));
      });


      //BELT---------------------------
      events.forEach(event => {


        const { belt, result } = event;
      
        
        if (!beltData[belt]) {
          beltData[belt] = { wins: 0, losses: 0 };
        }
      
        if (result === 'Victoire') {
          beltData[belt].wins++;
        } else if (result === 'Défaite') {
          beltData[belt].losses++;
        }
       
      });

      const beltArray = Object.entries(beltData).map(([belt, { wins, losses }]) => ({
        belt: belt,
        wins,
        losses,
      }));
      
      beltArray.forEach(b => {  
        beltLabels.push(b.belt);
        beltRatio.push(CalculateWinRate(b.wins, b.losses));
      });


      //YEARS------------------
      events.forEach(event => {

        
        const { date, result } = event;

        const dateObject = new Date(date);
        const year = dateObject.getFullYear();
        
        if (!yearsData[year]) {
          yearsData[year] = { wins: 0, losses: 0 };
        }
      
        if (result === 'Victoire') {
          yearsData[year].wins++;
        } else if (result === 'Défaite') {
          yearsData[year].losses++;
        }
       
      });

      const yearsArray = Object.entries(yearsData).map(([year, { wins, losses }]) => ({
        date: year,
        wins,
        losses,
      }));
      
      yearsArray.forEach(w => { 
        yearsLabels.push(w.date);
        yearsRatio.push(CalculateWinRate(w.wins, w.losses));
        soloYearsData.push(w.wins);
      });

      generateGraph();

    });

}





// Function to generate random data (for demonstration purposes)
function generateRandomData(length) {
  const data = [];
  for (let i = 0; i < length; i++) {
    data.push(Math.random()*2);
  }
  return data;
}

// Initialize line charts when the DOM is ready
function generateGraph() {
  const winLossWeightChartCtx = document.getElementById('winLossWeightChart').getContext('2d');
  const winLossBeltChartCtx = document.getElementById('winLossBeltChart').getContext('2d');
  const winLossOverTimeChartCtx = document.getElementById('winLossOverTimeChart').getContext('2d');
  const winOverTimeChartCtx = document.getElementById('winOverTimeChart').getContext('2d');


  // Line chart for Win/Loss per Weight
  new Chart(winLossWeightChartCtx, {
    type: 'line',
    data: {
      labels: weightLabels,
      datasets: [{
        label: 'Ratio de victoire par poids',
        data: weightRatio,
        borderColor: 'blue',
        borderWidth: 2,
        fill: true,
      }]
    },
    options: {
      // Customize the chart options here (e.g., title, axis labels, etc.)
      scales: {
        y: {
          beginAtZero: true // Start the y-axis from zero
        }
      },
      plugins: {
        legend: {
          display: true, // Show the legend
          position: 'top', // Position of the legend
          labels: {
            font: {
              size: 14 // Adjust the font size of the legend
            }
          }
        }
      }
    }
  });

  

  // Line chart for Win/Loss per Belt
  new Chart(winLossBeltChartCtx, {
    type: 'line',
    data: {
      labels: beltLabels,
      datasets: [{
        label: 'Ratio de victoire par ceinture',
        data: beltRatio,
        borderColor: 'orange',
        borderWidth: 2,
        fill: true
      }]
    },
    options: {
      // Customize the chart options here (e.g., title, axis labels, etc.)
      scales: {
        y: {
          beginAtZero: true // Start the y-axis from zero
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            font: {
              size: 14
            }
          }
        }
      }
    }
  });

  // Line chart for Win/Loss over Time
  new Chart(winLossOverTimeChartCtx, {
    type: 'line',
    data: {
      labels: yearsLabels,
      datasets: [{
        label: 'Ratio de victoire par année',
        data: yearsRatio,
        borderColor: 'purple',
        borderWidth: 2,
        fill: true
      }]
    },
    options: {
      // Customize the chart options here (e.g., title, axis labels, etc.)
      scales: {
        y: {
          beginAtZero: true // Start the y-axis from zero
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            font: {
              size: 14
            }
          }
        }
      }
    }
  });

  new Chart(winOverTimeChartCtx, {
    type: 'line',
    data: {
      labels: yearsLabels,
      datasets: [{
        label: 'Victoires par année',
        data: soloYearsData,
        borderColor: 'purple',
        borderWidth: 2,
        fill: true
      }]
    },
    options: {
      // Customize the chart options here (e.g., title, axis labels, etc.)
      scales: {
        y: {
          beginAtZero: true, // Start the y-axis from zero
          ticks: {
            callback: function (value) {
              if (Number.isInteger(value)) {
                return value.toString(); // Display integer values as strings
              }
            }
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            font: {
              size: 14
            }
          }
        }
      }
    }
  });
};


function CalculateWinRate(win, lost)
{
  return  parseFloat(win / (win + lost));
}