async function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = window.apiKey;
    const coordinates_url = `https://api.api-ninjas.com/v1/geocoding?city=${city}`;

    try {
        const coordinate_data = await fetch(coordinates_url, {
            method: 'GET',
            headers: {
                'X-Api-Key': apiKey
            }
        })
        const coordinate_response = await coordinate_data.json();
        const coordinates = coordinate_response[0];
        const url = `https://api.api-ninjas.com/v1/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}`;
        const response = await fetch(url,{
            method: 'GET',
            headers: {
                'X-Api-Key': apiKey
            }
        });
        const data = await response.json();
        console.log(response.status);
        if (response.status === 200) {
            const weatherInfo = `
                <p><strong>City:</strong> ${coordinates.name}, ${coordinates.state} </p>
                <p><strong>Temperature:</strong> ${data.temp} °C</p>
                <p><strong>Low:</strong> ${data.min_temp} °C</p>
                <p><strong>High:</strong> ${data.max_temp} °C</p>
                <p><strong>Humidity:</strong> ${data.humidity} %</p>
                <p><strong>Wind Speed:</strong> ${data.wind_speed} m/s</p>
                <p><strong>Feels Like:</strong> ${data.feels_like} °C</p>
                <p><strong>Cloud:</strong> ${data.cloud_pct} %</p>
            `;
            document.getElementById('weather-info').innerHTML = weatherInfo;
            console.log(data)
        } else {
            document.getElementById('weather-info').innerHTML = '<p>City not found.</p>';
        }
        document.getElementById('city').value = '';
    } catch (error) {
        document.getElementById('weather-info').innerHTML = '<p>Error retrieving weather data.</p>';
    }
}
