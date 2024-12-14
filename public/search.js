const citySearch = document.getElementById("search-bar");
const dropdown = document.getElementById("search-dropdown");

const API_KEY = "CS6Lxw9hGRYvRGbvsAl9knIO3SpHccIn";

citySearch.addEventListener("input", async (e) => {
    const query = e.target.value;

    if (query.length < 3) {
        dropdown.classList.add("hidden");
        return; 
    };

    const url = `https://api.geocodify.com/v2/geocode?api_key=${API_KEY}&q=${query}&limit=10`;

    try {
        const response = await fetch(url);
        const data = await response.json();

       
        dropdown.innerHTML = "";

        if (data.response && data.response.features) {
            data.response.features.forEach((feature) => {
                const city = feature.properties.locality || feature.properties.name;
                const country = feature.properties.country_a;
                const state = feature.properties.region_a;;

                const dropdownItem = document.createElement("div");
                dropdownItem.className = "dropdown-item";
                dropdownItem.textContent = `${city}, ${state}, ${country}`;
                dropdownItem.addEventListener("click", async () => {
                    console.log(feature);
                    const latitude = feature.geometry.coordinates[1];
                    const longitude = feature.geometry.coordinates[0];
                    citySearch.value = `${city}, ${state}, ${country}`;
                    dropdown.classList.add("hidden");
                    const weatherData = await fetchWeatherForcast(latitude, longitude);
                    renderChart(weatherData);
                });

                dropdown.appendChild(dropdownItem);
            });
            dropdown.classList.remove("hidden");
        } else {
            dropdown.classList.add("hidden");
        }
    } catch (error) {
        console.error("Error fetching city data:", error);
        dropdown.classList.add("hidden");
    }

    
});



function populateDropdown(cities) {
    dropdown.innerHTML = ""; 

    if (cities.length === 0) {
        dropdown.classList.add("hidden");
        return;
    }

    cities.forEach(city => {
        const item = document.createElement("div");
        item.textContent = city.name;
        item.classList.add("dropdown-item");
        item.addEventListener("click", () => {
            citySearch.value = city.name;
            dropdown.classList.add("hidden");
            console.log("Selected City:", city);
        });
        dropdown.appendChild(item);
    });

    dropdown.classList.remove("hidden");
}

let debounceTimeout;
function debounce(func, delay) {
    return (...args) => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => func(...args), delay);
    };
}


dropdown.addEventListener("click", () => {
    dropdown.classList.add("hidden");
});

async function fetchWeatherForcast(latitude, longitude) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=wind_speed_10m,wind_direction_10m,wind_gusts_10m&daily=temperature_2m_max,temperature_2m_min,rain_sum&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=GMT&forecast_days=14&forecast_minutely_15=24`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

let rainChart = null;
let tempChart = null;

function renderChart(weatherData) {
    const labels = weatherData.daily.time;
    const maxTemps = weatherData.daily.temperature_2m_max;
    const minTemps = weatherData.daily.temperature_2m_min;
    const rainData = weatherData.daily.rain_sum;

    if (rainChart) {
        rainChart.destroy();
    }

    if (tempChart) {
        tempChart.destroy();
    }
  
    rainChart = new Chart(document.getElementById('rainChart'), {
      type: 'bar',
      data: {
          labels: labels,
          datasets: [{
              label: 'Rainfall (inches)',
              data: rainData,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
          }]
      },
      options: {
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true,
                  title: {
                      display: true,
                      text: 'Rainfall (inches)'
                  }
              },
              x: {
                  title: {
                      display: true,
                      text: 'Date'
                  }
              }
          }
      }
  });
  
  tempChart = new Chart(document.getElementById('tempChart'), {
      type: 'line',
      data: {
          labels: labels,
          datasets: [
              {
                  label: 'Max Temperature (°F)',
                  data: maxTemps,
                  fill: false,
                  borderColor: 'rgba(255, 99, 132, 1)',
                  tension: 0.1
              },
              {
                  label: 'Min Temperature (°F)',
                  data: minTemps,
                  fill: false,
                  borderColor: 'rgba(54, 162, 235, 1)',
                  tension: 0.1
              }
          ]
      },
      options: {
          responsive: true,
          scales: {
              y: {
                  title: {
                      display: true,
                      text: 'Temperature (°F)'
                  }
              },
              x: {
                  title: {
                      display: true,
                      text: 'Date'
                  }
              }
          }
      }
  });
  




}