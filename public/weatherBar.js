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
        const cityDiv = document.createElement('div');
        cityDiv.setAttribute('class', 'city-div');
        cityDiv.innerHTML = '<h3>' + cities[i].name + '</h3>';
        weatherBarContent.appendChild(cityDiv);


        const cityWeather = document.createElement('div');
        cityWeather.setAttribute('class', 'city-weather');

        const currentWeather = getWeather(cities[i].name, cities[i].latitude, cities[i].longitude);

        currentWeather.then(data => {
            console.log('is day:', data.current.is_day);

            let weatherIcon = `<i class="wu `;

            if (data.current.is_day === 0) {
                weatherIcon += 'wu-night ';
            }

            weatherIcon += `wu-white wu-64 `;

            if (data.current.weather_code === 0) {
                weatherIcon += `wu-clear"></i>`;
            } else if (data.current.weather_code === 1) {
                weatherIcon += `wu-partlycloudy"></i>`;
            } else if (data.current.weather_code === 2) {
                weatherIcon += `wu-cloudy"></i>`;
            } else if (data.current.weather_code === 3) {
                weatherIcon += `wu-mostlycloudy"></i>`;
            } else if (data.current.weather_code === 45 || data.current.weather_code === 48) {
                weatherIcon += `wu-fog"></i>`;
            } else if (data.current.weather_code === 61 || data.current.weather_code === 62 || data.current.weather_code === 63 || data.current.weather_code === 65) {
                weatherIcon += `wu-chancerain"></i>`;
            } else if (data.current.weather_code === 66 || data.current.weather_code === 67) {
                weatherIcon += `wu-chancesleet"></i>`;
            } else if (data.current.weather_code === 71 || data.current.weather_code === 73 || data.current.weather_code === 75 || data.current.weather_code === 77) {
                weatherIcon += `wu-chancesnow"></i>`;
            } else if (data.current.weather_code === 80 || data.current.weather_code === 81 || data.current.weather_code === 82) {
                weatherIcon += `wu-rain"></i>`;
            } else if (data.current.weather_code === 85 || data.current.weather_code === 86) {
                weatherIcon = `wu-snow"></i>`;
            } else if (data.current.weather_code === 95) {
                weatherIcon += `wu-tstorms"></i>`;
            };

            console.log(weatherIcon);

            cityWeather.innerHTML += weatherIcon;

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
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,is_day,rain,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&forecast_days=1&forecast_minutely_15=24`)
    const data = await response.json();
    return data;
};

window.onload = getWeatherBarData();