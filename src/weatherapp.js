document.getElementById('search-button').addEventListener('click', fetchWeatherData);

async function fetchWeatherData() {
    const searchBar = document.getElementById('search-bar');
    const location = searchBar.value;

    console.log(location);
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&hourly=temperature_2m`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeatherData(data) {
    const weatherContainer = document.getElementById('weather-container');

    console.log(weatherContainer);
    weatherContainer.innerHTML = `
        <h2>Weather Forecast</h2>
        <p>Temperature: ${data.hourly.temperature_2m[0]}°C</p>
    `;
}