// Function to generate random data (for demonstration purposes)
function generateRandomData(length) {
  const data = [];
  for (let i = 0; i < length; i++) {
    data.push(Math.random()*2);
  }
  return data;
}

// Initialize line charts when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  const winLossWeightChartCtx = document.getElementById('winLossWeightChart').getContext('2d');
  const winLossAgeChartCtx = document.getElementById('winLossAgeChart').getContext('2d');
  const winLossBeltChartCtx = document.getElementById('winLossBeltChart').getContext('2d');
  const winLossOverTimeChartCtx = document.getElementById('winLossOverTimeChart').getContext('2d');

  // Generate random data for demonstration purposes
  const winLossWeightData = generateRandomData(4);
  const winLossAgeData = generateRandomData(10);
  const winLossBeltData = generateRandomData(5);
  const winLossOverTimeData = generateRandomData(12);

  // Line chart for Win/Loss per Weight
  new Chart(winLossWeightChartCtx, {
    type: 'line',
    data: {
      labels: ['60kg', '62kg', '71kg', '72kg'],
      datasets: [{
        label: 'Win/Loss per Weight',
        data: winLossWeightData,
        borderColor: 'blue',
        borderWidth: 2,
        fill: true,
      }]
    },
    options: {
      // Customize the chart options here (e.g., title, axis labels, etc.)
      scales: {
        y: {
          beginAtZero: false // Start the y-axis from zero
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

  // Line chart for Win/Loss per Age
  new Chart(winLossAgeChartCtx, {
    type: 'line',
    data: {
      labels: ['18', '19', '20', '21', '22', '23', '24', '25', '26', '27'],
      datasets: [{
        label: 'Win/Loss per Age',
        data: winLossAgeData,
        borderColor: 'green',
        borderWidth: 2,
        fill: true
      }]
    },
    options: {
      // Customize the chart options here (e.g., title, axis labels, etc.)
      scales: {
        y: {
          beginAtZero: false // Start the y-axis from zero
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

  // Line chart for Win/Loss per Belt
  new Chart(winLossBeltChartCtx, {
    type: 'line',
    data: {
      labels: ['Yellow Belt', 'Green Belt', 'Blue Belt', 'Red Belt', 'Black Belt'],
      datasets: [{
        label: 'Win/Loss per Belt',
        data: winLossBeltData,
        borderColor: 'orange',
        borderWidth: 2,
        fill: true
      }]
    },
    options: {
      // Customize the chart options here (e.g., title, axis labels, etc.)
      scales: {
        y: {
          beginAtZero: false // Start the y-axis from zero
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
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: 'Win/Loss over Time',
        data: winLossOverTimeData,
        borderColor: 'purple',
        borderWidth: 2,
        fill: true
      }]
    },
    options: {
      // Customize the chart options here (e.g., title, axis labels, etc.)
      scales: {
        y: {
          beginAtZero: false // Start the y-axis from zero
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
  
});
