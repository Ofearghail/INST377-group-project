async function getWeatherBarData() {
   await fetch('/cities')
        .then(response => response.json())
        .then(data => {
            console.log('Data:', data);
            const cities = data.map(city => {
                return {
                    name: city.city_name,
                    latitude: city.latitude,
                    longitude: city.longitude
                };
            });
            console.log('Cities:', cities);
            renderWeatherBar(cities);
        });

};

function renderWeatherBar(cities) { 
    const weatherBar = document.getElementById('weather-bar');
    weatherBar.innerHTML = `
        <div class="weather-bar">
            <h2>Current Weather In:</h2>
            <div id="weather-bar-content"></div>
        </div>
    `;

    const weatherBarContent = document.getElementById('weather-bar-content');

    for (let i = 0; i < 4; i++) {

        console.log(cities[i].name);
        const cityWeather = document.createElement('div');
        cityWeather.setAttribute('class', 'city-weather');
        cityWeather.setAttribute('id', cities[i].name);

        cityWeather.innerHTML = '<h3>' + cities[i].name + '</h3>';

        const currentWeather = getWeather(cities[i].name, cities[i].latitude, cities[i].longitude);

        currentWeather.then(data => {
            console.log('Current weather:', data);
            console.log('Current weather:', data.current.temperature_2m);
            cityWeather.innerHTML += `
                <p>${data.current.temperature_2m}°F</p>
                <p>Humidity: ${data.current.relative_humidity_2m}%</p>
                <p>Wind Speed: ${data.current.wind_speed_10m} mph</p>
            `;
        });
        weatherBarContent.appendChild(cityWeather);
    }
}

async function getWeather(cityName, latitude, longitude) {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,is_day,rain,wind_speed_10m,wind_direction_10m,wind_gusts_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&forecast_days=1&forecast_minutely_15=24`)
    const data = await response.json();
    return data;
};

window.onload = getWeatherBarData();